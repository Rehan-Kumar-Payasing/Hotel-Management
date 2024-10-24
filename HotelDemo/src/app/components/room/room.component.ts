import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/user.service';
import { RoomDTO } from '../../models/room-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // Import AuthService for role checking

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  rooms: RoomDTO[] = [];
  room: RoomDTO = new RoomDTO();
  selectedRoom: RoomDTO | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  userRole: string |null= ''; // To hold the current user's role

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get the current user's role
    if (this.userRole !== 'Receptionist') {
      this.router.navigate(['/unauthorized']); // Redirect if not authorized
    } else {
      this.getRooms(); // Initialize rooms list if authorized
    }
  }

  getRooms(): void {
    this.dataService.getRooms().subscribe(
      (data: RoomDTO[]) => {
        this.rooms = data;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error fetching rooms: ${error.message}`;
      }
    );
  }

  onRoomSelect(): void {
    this.clearMessages();
  }

  addRoom(): void {
    this.dataService.addRoom(this.room).subscribe(
      (data: RoomDTO) => {
        this.rooms.push(data);
        this.successMessage = 'Room added successfully';
        this.room = new RoomDTO();
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error adding room: ${error.message}`;
      }
    );
  }

  updateRoom(room: RoomDTO): void {
    this.dataService.updateRoom(room.roomId, room).subscribe(
      () => {
        this.successMessage = 'Room updated successfully';
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error updating room: ${error.message}`;
      }
    );
  }

  deleteRoom(roomId: number): void {
    this.dataService.deleteRoom(roomId).subscribe(
      () => {
        this.rooms = this.rooms.filter((room) => room.roomId !== roomId);
        this.selectedRoom = null;
        this.successMessage = 'Room deleted successfully';
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error deleting room: ${error.message}`;
      }
    );
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
