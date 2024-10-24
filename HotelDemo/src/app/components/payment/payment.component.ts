import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/user.service';
import { PaymentDTO } from '../../models/payment-dto';
import { AuthService } from '../../services/auth.service';
import { ReservationDTO } from '../../models/reservation-dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  reservations: ReservationDTO[] = [];
  reservationIds: number[] = [];
  payments: PaymentDTO[] = [];
  payment: PaymentDTO = new PaymentDTO(0, 0, 0);
  selectedPaymentId: number | null = null;
  isEditing: boolean = false;
  errorMessage: string = '';
  userRole: string | null = '';
  minDate: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllReservations();
    this.userRole = this.authService.getUserRole();
    if (this.userRole !== 'Receptionist') {
      this.router.navigate(['/unauthorized']);
    } else {
      this.loadPayments();
    }
    this.setMinDate();
  }

  setMinDate(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Format as 'YYYY-MM-DDTHH:MM'
    this.minDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getAllReservations(): void {
    this.dataService
      .getAllReservations()
      .subscribe((reservations: ReservationDTO[]) => {
        this.reservations = reservations;
        this.reservationIds = reservations.map((res) => res.reservationId);
      });
  }

  loadPayments(): void {
    this.dataService.getAllPayments().subscribe({
      next: (data) => (this.payments = data),
      error: (err) =>
        (this.errorMessage = 'Error fetching payments: ' + err.message),
    });
  }
  // getPaymentById(id: number): void {
  //   this.dataService.getPaymentById(id).subscribe({
  //     next: (data) => {
  //       this.payment = data;
  //       this.selectedPaymentId = id;
  //       this.isEditing = true;
  //     },
  //     error: (err) =>
  //       (this.errorMessage = 'Error fetching payment: ' + err.message),
  //   });
  // }

  getPaymentById(id: number): void {
    // Fetch payment details if necessary, or just set values
    this.dataService.getPaymentById(id).subscribe({
      next: (data) => {
        // Fill in the payment details if you are fetching it from the backend
        this.payment = data;
  
        // Set the current date and time for paymentTime
        const now = new Date();
        this.payment.paymentTime = now.toISOString().slice(0, 16); // For datetime-local input
  
        // Calculate and set the total amount (use the method from DataService or add your logic)
        this.calculateTotalAmount(id);
  
        // Mark as editing
        this.selectedPaymentId = id;
        this.isEditing = true;
      },
      error: (err) =>
        (this.errorMessage = 'Error fetching payment: ' + err.message),
    });
  }
  
  calculateTotalAmount(reservationId: number): void {
    // Assuming you need to call a service to get the total amount
    this.dataService.addPayment(this.payment).subscribe({
      next: (response) => {
        // Set the total amount returned by the backend
        this.payment.totalAmount = response.PaymentDetails.totalAmount || 0;
      },
      error: (err) =>
        (this.errorMessage = 'Error calculating total amount: ' + err.message),
    });
  }
  

  addPayment(): void {
    this.dataService.addPayment(this.payment).subscribe({
      next: (response) => {
        // Assuming response.PaymentDetails contains the updated PaymentDTO
        this.payment = response.PaymentDetails;

        // You can now manually update the UI if necessary (e.g., Total Amount input)
        // If using reactive forms, you can patch values directly.

        this.loadPayments(); // Reload the list of payments
        this.resetForm();
      },
      error: (err) =>
        (this.errorMessage = 'Error adding payment: ' + err.message),
    });
  }

  updatePayment(): void {
    if (this.selectedPaymentId !== null) {
      this.dataService
        .updatePayment(this.selectedPaymentId, this.payment)
        .subscribe({
          next: () => {
            this.loadPayments();
            this.resetForm();
          },
          error: (err) =>
            (this.errorMessage = 'Error updating payment: ' + err.message),
        });
    }
  }

  deletePayment(id: number): void {
    this.dataService.deletePayment(id).subscribe({
      next: () => this.loadPayments(),
      error: (err) =>
        (this.errorMessage = 'Error deleting payment: ' + err.message),
    });
  }

  resetForm(): void {
    this.payment = new PaymentDTO(0, 0, 0);
    this.selectedPaymentId = null;
    this.isEditing = false;
    this.errorMessage = '';
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}

