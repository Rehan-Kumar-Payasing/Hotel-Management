export class AdminDTO {
  adminId: number;
  adminName: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  email?: string;

  constructor(
    adminId: number,
    adminName: string,
    password?: string,
    confirmPassword?: string,
    role?: string,
    email?: string
  ) {
    this.adminId = adminId;
    this.adminName = adminName;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = role;
    this.email = email;
  }
}
