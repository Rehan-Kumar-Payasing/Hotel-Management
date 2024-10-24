import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/user.service';
import { StaffDTO } from '../../models/staff-dto';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService for role checking

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  staffList: StaffDTO[] = [];
  selectedStaff: StaffDTO | null = null;
  isEditing: boolean = false;
  newStaff: StaffDTO = {} as StaffDTO;
  userRole: string | null = ''; // To hold the current user's role

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get the current user's role
    if (this.userRole !== 'Manager') {
      this.router.navigate(['/unauthorized']); // Redirect if not authorized
    } else {
      this.loadStaff(); // Initialize staff list if authorized
    }
  }

  loadStaff(): void {
    this.dataService.getStaff().subscribe(
      (staff: StaffDTO[]) => {
        this.staffList = staff;
      },
      (error) => {
        console.error('Error fetching staff:', error);
      }
    );
  }

  viewStaff(id: number): void {
    this.dataService.getStaffById(id).subscribe(
      (staff: StaffDTO) => {
        this.selectedStaff = staff;
        this.isEditing = false;
      },
      (error) => {
        console.error('Error fetching staff by ID:', error);
      }
    );
  }

  addStaff(): void {
    this.dataService.addStaff(this.newStaff).subscribe(
      (staff: StaffDTO) => {
        this.staffList.push(staff);
        this.newStaff = {} as StaffDTO;
        this.router.navigate(['/staff']);
      },
      (error) => {
        console.error('Error adding staff:', error);
      }
    );
  }

  updateStaff(id: number): void {
    if (this.selectedStaff) {
      this.dataService.updateStaff(id, this.selectedStaff).subscribe(
        () => {
          this.loadStaff();
          this.selectedStaff = null;
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating staff:', error);
        }
      );
    }
  }

  deleteStaff(id: number): void {
    this.dataService.deleteStaff(id).subscribe(
      () => {
        this.staffList = this.staffList.filter((staff) => staff.staffId !== id);
        this.selectedStaff = null;
      },
      (error) => {
        console.error('Error deleting staff:', error);
      }
    );
  }

  startEditing(staff: StaffDTO): void {
    this.selectedStaff = { ...staff };
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.selectedStaff = null;
    this.isEditing = false;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
