import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken(); // Check if user is authenticated
    const userRole = this.authService.getUserRole(); // Get the user role
    const requiredRole = next.data['role']; // Get the required role for the route

    if (!token) {
      alert('You are not logged in. Please log in first.');
      this.router.navigate(['/login']);
      return false;
    }

    // Check if the role matches if route is protected with a role
    if (requiredRole && userRole !== requiredRole) {
      alert('You do not have permission to access this page.');
      this.router.navigate(['/login']);
      return false;
    }

    return true; // Allow access
  }
}
