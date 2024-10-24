export class PaymentDTO {
  paymentId: number; // Optional property
  reservationId: number;
  totalAmount: number;
  paymentTime: Date|string;

  constructor(
    reservationId: number,
    totalAmount: number,
    paymentId?: number // Optional parameter
  ) {
    this.reservationId = reservationId;
    this.totalAmount = totalAmount;
    this.paymentId = paymentId ?? 0;
    this.paymentTime = new Date(); // Current time automatically
  }
}
