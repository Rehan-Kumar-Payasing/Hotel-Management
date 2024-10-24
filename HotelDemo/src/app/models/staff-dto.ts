export class StaffDTO {
  staffId: number;
  name: string;
  age: number;
  address?: string; // Optional field
  salary: number;
  designation?: string; // Optional field

  constructor(
    staffId: number,
    name: string,
    age: number,
    salary: number,
    address?: string,
    designation?: string
  ) {
    this.staffId = staffId;
    this.name = name;
    this.age = age;
    this.salary = salary;
    this.address = address;
    this.designation = designation;
  }
}
