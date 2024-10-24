import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/user.service';
import { ReservationDTO } from '../../models/reservation-dto';
import { AuthService } from '../../services/auth.service'; // Import AuthService for role checking
import { GuestDTO } from '../../models/guest-dto';
import { RoomDTO } from '../../models/room-dto';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  reservation: ReservationDTO = new ReservationDTO();
  guests: GuestDTO[] = [];
  availableRooms: RoomDTO[] = [];
  reservations: ReservationDTO[] = [];
  email: string = '';
  searchedReservation: ReservationDTO | null = null;
  deleteId: number | null = null;
  userRole: string | null = null; // Track user role
  minDate: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get user role
    if (this.userRole !== 'Receptionist') {
      alert('You do not have permission to access this page.');
      this.router.navigate(['/login']); // Redirect if not Receptionist
      return;
    }
    this.getAllReservations(); // Initialize reservations list
    this.loadGuests();
    this.loadAvailableRooms();
    this.setMinDate();
  }

  setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  loadAvailableRooms(): void {
    this.dataService.getRooms().subscribe(
      (rooms: RoomDTO[]) => {
        // Filter the rooms to include only those with status "Available"
        this.availableRooms = rooms.filter(
          (room) => room.status === 'Available'
        );
      },
      (error) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  loadGuests(): void {
    this.dataService.getGuests().subscribe(
      (guests: GuestDTO[]) => {
        this.guests = guests;
      },
      (error) => {
        console.error('Error fetching guests:', error);
      }
    );
  }

  submitReservation(): void {
    if (this.reservation.reservationId) {
      this.dataService
        .updateReservation(this.reservation.reservationId, this.reservation)
        .subscribe(() => {
          this.clearForm();
          this.getAllReservations();
        });
    } else {
      this.dataService.addReservation(this.reservation).subscribe(() => {
        this.clearForm();
        this.getAllReservations();
      });
    }
  }

  getAllReservations(): void {
    this.dataService.getAllReservations().subscribe((data) => {
      this.reservations = data;
    });
  }

  getReservationByEmail(): void {
    if (this.email) {
      this.dataService.getReservationByEmail(this.email).subscribe((data) => {
        this.searchedReservation = data;
      });
    }
  }

  deleteReservationById(): void {
    if (this.deleteId) {
      this.dataService.deleteReservation(this.deleteId).subscribe(() => {
        this.deleteId = null;
        this.getAllReservations();
      });
    }
  }

  addBill(reservation: ReservationDTO): void {
    const stayDates = this.calculateStayDuration(
      reservation.checkInDate,
      reservation.checkOutDate
    );

    // Navigate to the Bill component, passing reservationId and stayDates as query parameters
    this.router.navigate(['/bill'], {
      queryParams: {
        reservationId: reservation.reservationId,
        stayDates: stayDates,
      },
    });
  }

  calculateStayDuration(
    checkInDate: string | Date,
    checkOutDate: string | Date
  ): string {
    // Convert to Date if the input is a string
    const checkIn =
      typeof checkInDate === 'string' ? new Date(checkInDate) : checkInDate;
    const checkOut =
      typeof checkOutDate === 'string' ? new Date(checkOutDate) : checkOutDate;

    // Ensure valid dates before calculating
    if (
      !checkIn ||
      !checkOut ||
      isNaN(checkIn.getTime()) ||
      isNaN(checkOut.getTime())
    ) {
      return 'Invalid dates';
    }

    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    return `${daysDiff}`;
  }

  deleteReservation(reservationId: number): void {
    this.dataService.deleteReservation(reservationId).subscribe(() => {
      this.getAllReservations(); // Refresh the reservations list
    });
  }

  clearForm(): void {
    this.reservation = new ReservationDTO();
    this.searchedReservation = null;
    this.email = '';
  }

  onReservationCompleted(): void {
    // After completing a reservation, navigate to the bill page
    this.router.navigate(['/bill']);
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  scrollToForm() {
    const formElement = document.getElementById('emailSearchForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
