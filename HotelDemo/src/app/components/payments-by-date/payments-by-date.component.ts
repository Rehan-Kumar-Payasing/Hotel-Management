import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-payments-by-date',
  templateUrl: './payments-by-date.component.html',
  styleUrls: ['./payments-by-date.component.css'],
})
export class PaymentsByDateComponent implements OnInit {
  payments: any[] = [];
  month: number | null = null;
  year: number | null = null;
  role: string | null = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole(); // Fetch the role
    if (this.role === 'Owner') {
      // Only call API if role is 'Owner'
      this.fetchPayments();
    }
  }

  fetchPayments(): void {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const params: any = {};

    if (this.month) {
      params.month = this.month;
    }
    if (this.year) {
      params.year = this.year;
    }

    const headers = {
      Authorization: `Bearer ${token}`, // Attach token as a Bearer token
    };

    this.http
      .get<any[]>('http://localhost:5269/api/Admins/GetAllByDate', {
        params,
        headers,
      })
      .subscribe(
        (data) => {
          this.payments = data;
        },
        (error) => {
          console.error('Error fetching payments:', error);
        }
      );
  }

  logOut(): void {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']); // Navigate to login page
  }
}
