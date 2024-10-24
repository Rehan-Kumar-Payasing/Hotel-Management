import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is authenticated on service initialization
    this.isAuthenticatedSubject.next(!!this.getUserRole());
  }

  login(credentials: any) {
    // Mock authentication, ideally here you'd call the backend
    const role =
      credentials.username === 'owner'
        ? 'Owner'
        : credentials.username === 'manager'
        ? 'Manager'
        : 'Receptionist';
    this.setUserRole(role);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserRole(role: string) {
    if (this.isBrowser()) {
      localStorage.setItem('role', role);
    }
  }

  getUserRole(): string | null {
    return this.isBrowser() ? localStorage.getItem('role') : null;
  }

  // Helper method to check if running in the browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}

