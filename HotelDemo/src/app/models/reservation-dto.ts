export class ReservationDTO {
  reservationId: number = 0;
  guestId?: number;
  roomId?: number;
  reservationDate: Date = new Date();
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  numberOfGuest: number = 0;
  bookingStatus: string = '';

  // Custom validation to ensure CheckInDate is earlier than CheckOutDate
  get isValidCheckInCheckOutDate(): boolean {
    return this.checkInDate < this.checkOutDate;
  }

  // Validation method for dates (can be used in custom validation logic)
  validateDates(): string | null {
    if (this.checkInDate >= this.checkOutDate) {
      return 'Check-in date must be earlier than check-out date.';
    }
    return null;
  }
}
