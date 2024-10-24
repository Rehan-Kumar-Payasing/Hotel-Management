import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'HotelDemo';
isLoggedIn: any;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          // Collapse the navbar if it's expanded
          const navbarToggler = document.querySelector('.navbar-collapse');
          if (navbarToggler && navbarToggler.classList.contains('show')) {
            navbarToggler.classList.remove('show');
          }
        }
      }
    });
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}

