// src/app/app.module.ts
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http'; // Import provideHttpClient and withFetch

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { DataService } from './services/user.service';
import { GuestComponent } from './components/guest/guest.component';
import { BillComponent } from './components/bill/bill.component';
import { PaymentComponent } from './components/payment/payment.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RoomComponent } from './components/room/room.component';
import { StaffComponent } from './components/staff/staff.component';
import { DelayGuard } from './guards/delay.guard';
import { LoginsComponent } from './components/logins/logins.component';
import { AuthInterceptor } from './auth.interceptor';
import { PaymentsByDateComponent } from './components/payments-by-date/payments-by-date.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    GuestComponent,
    BillComponent,
    PaymentComponent,
    InventoryComponent,
    RoomComponent,
    StaffComponent,
    LoginsComponent,
    PaymentsByDateComponent,
   
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideHttpClient(withFetch()), // Configure HttpClient with fetch
    DataService, // Updated service provider
    provideClientHydration(),
    DelayGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
