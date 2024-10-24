import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/user.service';
import { BillDTO } from '../../models/bill-dto';
import { AuthService } from '../../services/auth.service';
import { ReservationDTO } from '../../models/reservation-dto';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  bills: BillDTO[] = [];
  reservations: ReservationDTO[] = [];
  selectedBillId: number | null = null;
  bill: BillDTO = new BillDTO();
  selectedReservation: ReservationDTO | null = null;
  message: string | null = null;
  userRole: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Extract query parameters for reservationId and stayDates
    this.route.queryParams.subscribe(params => {
      const reservationId = params['reservationId'];
      const stayDates = params['stayDates'];

      if (reservationId) {
        this.bill.reservationId = reservationId;
      }

      if (stayDates) {
        this.bill.stayDates = stayDates;
      }
    });

    this.loadReservations();
    this.userRole = this.authService.getUserRole();
    if (this.userRole !== 'Receptionist') {
      this.router.navigate(['/unauthorized']);
    } else {
      this.getBills();
    }
  }

  loadReservations(): void {
    this.dataService.getAllReservations().subscribe(
      (reservations: ReservationDTO[]) => {
        this.reservations = reservations;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  getBills(): void {
    this.dataService.getBills().subscribe(
      (data) => (this.bills = data),
      (error) => console.error('Error fetching bills:', error)
    );
  }

  getBillById(id: number): void {
    this.dataService.getBillById(id).subscribe(
      (data) => {
        this.bill = data;
        this.selectedBillId = id;
      },
      (error) => console.error('Error fetching bill:', error)
    );
  }

  addBill(): void {
    this.dataService.addBill(this.bill).subscribe(
      (data) => {
        this.message = 'Bill added successfully!';
        this.getBills();
        this.resetForm();
        this.onBillGenerated();
      },
      (error) => console.error('Error adding bill:', error)
    );
  }

  updateBill(): void {
    if (this.selectedBillId !== null && this.selectedBillId !== undefined) {
      this.dataService.updateBill(this.selectedBillId, this.bill).subscribe(
        () => {
          this.message = 'Bill updated successfully!';
          this.getBills();
          this.resetForm();
          this.onBillGenerated();
        },
        (error) => console.error('Error updating bill:', error)
      );
    }
  }

  deleteBill(id: number): void {
    this.dataService.deleteBill(id).subscribe(
      () => {
        this.message = 'Bill deleted successfully!';
        this.getBills();
      },
      (error) => console.error('Error deleting bill:', error)
    );
  }

  resetForm(): void {
    this.bill = new BillDTO();
    this.selectedBillId = null;
  }

  // Handle the event when a reservation is selected
  onReservationChange(event: any): void {
    const reservationId = event.target.value;
    const reservation = this.reservations.find(r => r.reservationId == reservationId);

    if (reservation) {
      this.selectedReservation = reservation;

      // Calculate stay days
      const stayDates = this.calculateStayDuration(reservation.checkInDate, reservation.checkOutDate);
      this.bill.stayDates = stayDates;

      // Optionally, you can update the query params as well
      this.router.navigate([], {
        queryParams: {
          reservationId: reservation.reservationId,
          stayDates: stayDates,
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  calculateStayDuration(checkInDate: string | Date, checkOutDate: string | Date): string {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return 'Invalid dates';
    }

    const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return `${diffDays}`;
  }

  onBillGenerated(): void {
    // this.router.navigate(['/payment']);
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
