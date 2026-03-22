export type UserRole = "student" | "company" | "admin";

// Data coming FROM client (register request)
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// Data stored IN database
export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: Date;
}

// Data returned TO client (safe response)
export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: Date;
}