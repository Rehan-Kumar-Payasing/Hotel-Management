export class GuestDTO {
  guestId: number;
  name: string;
  email: string;
  gender: string;
  address?: string;
  phoneNumber: string;

  constructor(
    guestId: number,
    name: string,
    email: string,
    gender: string,
    address: string | undefined,
    phoneNumber: string
  ) {
    this.guestId = guestId;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}
