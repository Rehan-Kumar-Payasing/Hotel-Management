import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuestDTO } from '../models/guest-dto';
import { ReservationDTO } from '../models/reservation-dto';
import { BillDTO } from '../models/bill-dto';
import { PaymentDTO } from '../models/payment-dto';
import { StaffDTO } from '../models/staff-dto';
import { InventoryDTO } from '../models/inventory-dto';
import { RoomDTO } from '../models/room-dto';
import { AdminDTO } from '../models/admin-dto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  [x: string]: any;
  // Base API URLs
  private baseApiUrl = 'http://localhost:5269/api';
  private adminApiUrl = 'http://localhost:5269/api/Admins';

  constructor(private http: HttpClient) {}

  // Room API methods
  getRooms(): Observable<RoomDTO[]> {
    const token = localStorage.getItem('token');
    return this.http.get<RoomDTO[]>(`${this.baseApiUrl}/Rooms/GetAll`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  getRoomById(id: number): Observable<RoomDTO> {
    const token = localStorage.getItem('token');
    return this.http.get<RoomDTO>(`${this.baseApiUrl}/Rooms/GetById`, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  addRoom(room: RoomDTO): Observable<RoomDTO> {
    const token = localStorage.getItem('token');
    return this.http.post<RoomDTO>(`${this.baseApiUrl}/Rooms/AddAll`, room, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  updateRoom(id: number, room: RoomDTO): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.put<void>(`${this.baseApiUrl}/Rooms/UpdateById`, room, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  deleteRoom(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.baseApiUrl}/Rooms/DeleteById`, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  // Guest API methods
  getGuests(): Observable<GuestDTO[]> {
    const token = localStorage.getItem('token');
    return this.http.get<GuestDTO[]>(`${this.baseApiUrl}/Guests/GetAll`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  getGuestById(id: number): Observable<GuestDTO> {
    const token = localStorage.getItem('token');
    return this.http.get<GuestDTO>(`${this.baseApiUrl}/Guests/GetById`, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  addGuest(guest: GuestDTO): Observable<GuestDTO> {
    const token = localStorage.getItem('token');
    return this.http.post<GuestDTO>(`${this.baseApiUrl}/Guests/AddAll`, guest, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  updateGuest(id: number, guest: GuestDTO): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.put<void>(`${this.baseApiUrl}/Guests/UpdateById`, guest, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  deleteGuest(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.baseApiUrl}/Guests/DeleteById`, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  // Reservation API methods
  getAllReservations(): Observable<ReservationDTO[]> {
    const token = localStorage.getItem('token');
    return this.http.get<ReservationDTO[]>(
      `${this.baseApiUrl}/Reservations/GetAll`,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  getReservationByEmail(email: string): Observable<ReservationDTO> {
    const token = localStorage.getItem('token');
    return this.http.get<ReservationDTO>(
      `${this.baseApiUrl}/Reservations/GetByEmail`,
      {
        params: new HttpParams().set('email', email),
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  addReservation(reservation: ReservationDTO): Observable<ReservationDTO> {
    const token = localStorage.getItem('token');
    return this.http.post<ReservationDTO>(
      `${this.baseApiUrl}/Reservations/AddAll`,
      reservation,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  updateReservation(id: number, reservation: ReservationDTO): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.put<void>(
      `${this.baseApiUrl}/Reservations/UpdateById`,
      reservation,
      {
        params: new HttpParams().set('id', id.toString()),
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  deleteReservation(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(
      `${this.baseApiUrl}/Reservations/DeleteById`,
      {
        params: new HttpParams().set('id', id.toString()),
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  // Bill API methods
  getBills(): Observable<BillDTO[]> {
    const token = localStorage.getItem('token');
    return this.http.get<BillDTO[]>(`${this.baseApiUrl}/Bills/GetAll`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  getBillById(id: number): Observable<BillDTO> {
    const token = localStorage.getItem('token');
    return this.http.get<BillDTO>(`${this.baseApiUrl}/Bills/GetById`, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  addBill(bill: BillDTO): Observable<BillDTO> {
    const token = localStorage.getItem('token');
    return this.http.post<BillDTO>(`${this.baseApiUrl}/Bills/AddAll`, bill, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  updateBill(id: number, bill: BillDTO): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.put<void>(`${this.baseApiUrl}/Bills/UpdateById`, bill, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  deleteBill(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.baseApiUrl}/Bills/DeleteById`, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // Payment API methods
  getAllPayments(): Observable<PaymentDTO[]> {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Manually add token to headers
    });

    return this.http.get<PaymentDTO[]>(`${this.baseApiUrl}/Payments/GetAll`, {
      headers,
    });
  }

  getPaymentById(id: number): Observable<PaymentDTO> {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Manually add token to headers
    });

    return this.http.get<PaymentDTO>(`${this.baseApiUrl}/Payments/GetById`, {
      params: new HttpParams().set('id', id.toString()),
      headers,
    });
  }

  // Method to get payment details by Reservation ID
  addPayment(payment: PaymentDTO): Observable<any> {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Manually add token to headers
    });

    // Create a new payment object excluding the paymentTime, which is set by the backend
    const newPayment = {
      reservationId: payment.reservationId,
      totalAmount: payment.totalAmount,
    };

    return this.http.post<any>(
      `${this.baseApiUrl}/Payments/AddAll`,
      newPayment,
      { headers }
    );
  }

  updatePayment(id: number, payment: PaymentDTO): Observable<void> {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Manually add token to headers
    });

    return this.http.put<void>(
      `${this.baseApiUrl}/Payments/UpdateById`,
      payment,
      {
        params: new HttpParams().set('id', id.toString()),
        headers,
      }
    );
  }

  deletePayment(id: number): Observable<void> {
    const token = localStorage.getItem('token'); // Fetch token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Manually add token to headers
    });

    return this.http.delete<void>(`${this.baseApiUrl}/Payments/DeleteById`, {
      params: new HttpParams().set('id', id.toString()),
      headers,
    });
  }
  // Inventory API methods
  getInventoryItems(): Observable<InventoryDTO[]> {
    const token = localStorage.getItem('token');
    return this.http.get<InventoryDTO[]>(
      `${this.baseApiUrl}/Inventories/GetAll`,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  getInventoryById(id: number): Observable<InventoryDTO> {
    const token = localStorage.getItem('token');
    return this.http.get<InventoryDTO>(
      `${this.baseApiUrl}/Inventories/GetById`,
      {
        params: new HttpParams().set('id', id.toString()),
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  addInventory(inventory: InventoryDTO): Observable<InventoryDTO> {
    const token = localStorage.getItem('token');
    return this.http.post<InventoryDTO>(
      `${this.baseApiUrl}/Inventories/AddAll`,
      inventory,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  updateInventory(id: number, inventory: InventoryDTO): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.put<void>(
      `${this.baseApiUrl}/Inventories/UpdateById`,
      inventory,
      {
        params: new HttpParams().set('id', id.toString()),
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  deleteInventory(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.baseApiUrl}/Inventories/DeleteById`, {
      params: new HttpParams().set('id', id.toString()),
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  // Staff API methods
  getStaff(): Observable<StaffDTO[]> {
    const token = localStorage.getItem('token');
    return this.http.get<StaffDTO[]>(`${this.baseApiUrl}/Staff`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  getStaffById(id: number): Observable<StaffDTO> {
    const token = localStorage.getItem('token');
    return this.http.get<StaffDTO>(`${this.baseApiUrl}/Staff/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  addStaff(staff: StaffDTO): Observable<StaffDTO> {
    const token = localStorage.getItem('token');
    return this.http.post<StaffDTO>(`${this.baseApiUrl}/Staff`, staff, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  updateStaff(id: number, staff: StaffDTO): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.put<void>(`${this.baseApiUrl}/Staff/${id}`, staff, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  deleteStaff(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.baseApiUrl}/Staff/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  // Admin API methods
  getAdmins(): Observable<AdminDTO[]> {
    return this.http.get<AdminDTO[]>(`${this.adminApiUrl}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getAdminById(id: number): Observable<AdminDTO> {
    return this.http.get<AdminDTO>(`${this.adminApiUrl}/GetById`, {
      params: new HttpParams().set('id', id.toString()),
    });
  }
}
