// src/app/models/bill-dto.ts
export class BillDTO {
  billId?: number;
  reservationId: number;
  stayDates: string;
  serviceAmounts: number;
  taxes: number;
  total: number;

  constructor(
    billId: number = 0, // Provide default values
    reservationId: number = 0,
    stayDates: string = '',
    serviceAmounts: number = 0,
    taxes: number = 0,
    total: number = 0
  ) {
    this.billId = billId;
    this.reservationId = reservationId;
    this.stayDates = stayDates;
    this.serviceAmounts = serviceAmounts;
    this.taxes = taxes;
    this.total = total;
  }
}
