import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './components/guest/guest.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { BillComponent } from './components/bill/bill.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RoomComponent } from './components/room/room.component';
import { StaffComponent } from './components/staff/staff.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PaymentsByDateComponent } from './components/payments-by-date/payments-by-date.component';
import { LoginsComponent } from './components/logins/logins.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginsComponent }, // Login route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Routes accessible by all authenticated users
  { path: 'guest', component: GuestComponent },
  {
    path: 'reservation',
    component: ReservationComponent,
    canActivate: [AuthGuard],
    data: { role: 'Receptionist' }, // Protect this route with role-based access
  },
  {
    path: 'bill',
    component: BillComponent,
    canActivate: [AuthGuard],
    data: { role: 'Receptionist' },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: { role: 'Receptionist' },
  },
  {
    path: 'room',
    component: RoomComponent,
    data: { role: 'Receptionist' },
  },
  {
    path: 'staff',
    component: StaffComponent,
    data: { role: 'Manager' },
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    data: { role: 'Manager' },
  },

  // Route for "Owner" role
  {
    path: 'payments-by-date',
    component: PaymentsByDateComponent,
    canActivate: [AuthGuard],
    data: { role: 'Owner' },
  },

  // Handle unauthorized access
  { path: 'login', component: LoginsComponent },

  // Redirect to unauthorized by default for unknown paths
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
