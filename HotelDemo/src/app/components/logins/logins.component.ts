import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrl: './logins.component.css',
})
export class LoginsComponent {
  loginData = {
    username: '',
    password: '',
  };
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.http
      .post<{ token: string; admin: any }>(
        'http://localhost:5269/api/Admins/Login',
        this.loginData
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.admin.role);

          // Check user role and navigate accordingly
          const userRole = this.authService.getUserRole();
          if (userRole === 'Owner') {
            this.router.navigate(['/payments-by-date']);
          } else if (userRole === 'Manager') {
            this.router.navigate(['/staff']);
          } else if (userRole === 'Receptionist') {
            this.router.navigate(['/guest']);
          } else {
            this.errorMessage = 'Unknown role';
          }

          alert('successfully logged in.');
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Login failed';
        },
      });
  }
}


