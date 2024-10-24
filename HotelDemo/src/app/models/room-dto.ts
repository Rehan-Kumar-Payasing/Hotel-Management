export class RoomDTO {
  roomId: number;
  roomNumber: string;
  roomType: string;
  status: string;

  constructor(
    roomId: number = 0,
    roomNumber: string = '',
    roomType: string = '',
    status: string = ''
  ) {
    this.roomId = roomId;
    this.roomNumber = roomNumber;
    this.roomType = roomType;
    this.status = status;
  }
}
