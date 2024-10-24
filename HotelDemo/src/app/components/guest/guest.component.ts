// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DataService } from '../../services/user.service';
// import { GuestDTO } from '../../models/guest-dto';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../../services/auth.service';  // Import AuthService

// @Component({
//   selector: 'app-guest',
//   templateUrl: './guest.component.html',
//   styleUrls: ['./guest.component.css'],
// })
// export class GuestComponent implements OnInit {
//   guests: GuestDTO[] = [];
//   guest: GuestDTO = {} as GuestDTO;
//   selectedGuestId: number | null = null;
//   message: string = '';
//   isReceptionist: boolean = false; // Flag to check if the user is a Receptionist

//   constructor(
//     private http: HttpClient,
//     private dataService: DataService,
//     private router: Router,
//     private authService: AuthService // Inject AuthService
//   ) {}

//   ngOnInit(): void {
//     this.checkUserRole(); // Check user role on init
//   }

//   checkUserRole(): void {
//     const role = this.authService.getUserRole();
//     if (role === 'Receptionist') {
//       this.isReceptionist = true;
//       this.getGuests();
//     } else {
//       this.router.navigate(['/unauthorized']); // Redirect if not Receptionist
//     }
//   }
//   getGuests(): void {
//     if (this.isReceptionist) {
//       this.dataService.getGuests().subscribe(
//         (data) => {
//           this.guests = data;
//         },
//         (error) => {
//           console.error('Error fetching guests', error);
//         }
//       );
//     }
//   }

//   getGuestById(id: number): void {
//     if (this.isReceptionist) {
//       this.dataService.getGuestById(id).subscribe(
//         (data) => {
//           this.guest = data;
//           this.selectedGuestId = id;
//         },
//         (error) => {
//           console.error('Error fetching guest by ID', error);
//         }
//       );
//     }
//   }

//   addGuest(): void {
//     if (this.isReceptionist && this.guest) {
//       this.dataService.addGuest(this.guest).subscribe(
//         (data) => {
//           this.guests.push(data);
//           this.message = 'Guest added successfully!';
//           this.guest = {} as GuestDTO; // Reset the form
//           this.onGuestAdded(); // Navigate after adding guest
//         },
//         (error) => {
//           console.error('Error adding guest', error);
//         }
//       );
//     }
//   }

//   updateGuest(): void {
//     if (this.isReceptionist && this.selectedGuestId !== null && this.guest) {
//       this.dataService.updateGuest(this.selectedGuestId, this.guest).subscribe(
//         () => {
//           this.message = 'Guest updated successfully!';
//           this.getGuests(); // Refresh the guest list
//         },
//         (error) => {
//           console.error('Error updating guest', error);
//         }
//       );
//     }
//   }

//   deleteGuest(id: number): void {
//     if (this.isReceptionist) {
//       this.dataService.deleteGuest(id).subscribe(
//         () => {
//           this.message = 'Guest deleted successfully!';
//           this.getGuests(); // Refresh the guest list
//         },
//         (error) => {
//           console.error('Error deleting guest', error);
//         }
//       );
//     }
//   }

//   onGuestAdded(): void {
//     this.router.navigate(['/reservation']);
//   }
//   logOut() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     this.router.navigate(['/login']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/user.service';
import { GuestDTO } from '../../models/guest-dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';  // Import AuthService

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent implements OnInit {
  guests: GuestDTO[] = [];
  guest: GuestDTO = {} as GuestDTO;
  selectedGuestId: number | null = null;
  message: string = '';
  isReceptionist: boolean = false; // Flag to check if the user is a Receptionist

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.checkUserRole(); // Check user role on init
  }

  checkUserRole(): void {
    const role = this.authService.getUserRole();
    if (role === 'Receptionist') {
      this.isReceptionist = true;
      this.getGuests();
    } else {
      this.router.navigate(['/unauthorized']); // Redirect if not Receptionist
    }
  }

  getGuests(): void {
    if (this.isReceptionist) {
      this.dataService.getGuests().subscribe(
        (data) => {
          this.guests = data;
        },
        (error) => {
          console.error('Error fetching guests', error);
        }
      );
    }
  }

  getGuestById(id: number): void {
    if (this.isReceptionist) {
      this.dataService.getGuestById(id).subscribe(
        (data) => {
          this.guest = data;
          this.selectedGuestId = id;
        },
        (error) => {
          console.error('Error fetching guest by ID', error);
        }
      );
    }
  }

  addGuest(): void {
    if (this.isReceptionist && this.guest) {
      this.dataService.addGuest(this.guest).subscribe(
        (data) => {
          this.guests.push(data);
          this.message = 'Guest added successfully!';
          this.resetForm(); // Reset form after adding guest
        },
        (error) => {
          console.error('Error adding guest', error);
        }
      );
    }
  }

  updateGuest(): void {
    if (this.isReceptionist && this.selectedGuestId !== null && this.guest) {
      this.dataService.updateGuest(this.selectedGuestId, this.guest).subscribe(
        () => {
          this.message = 'Guest updated successfully!';
          this.getGuests(); // Refresh the guest list
          this.resetForm(); // Reset form after updating guest
        },
        (error) => {
          console.error('Error updating guest', error);
        }
      );
    }
  }

  deleteGuest(id: number): void {
    if (this.isReceptionist) {
      this.dataService.deleteGuest(id).subscribe(
        () => {
          this.message = 'Guest deleted successfully!';
          this.getGuests(); // Refresh the guest list
        },
        (error) => {
          console.error('Error deleting guest', error);
        }
      );
    }
  }

  onGuestAdded(): void {
    this.router.navigate(['/reservation']);
  }

  // Method to reset the form after adding or updating a guest
  resetForm(): void {
    this.guest = {} as GuestDTO; // Reset the guest object
    this.selectedGuestId = null; // Clear the selected guest ID
    this.message = ''; // Clear any messages
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
