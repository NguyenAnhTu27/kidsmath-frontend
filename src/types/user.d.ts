export type Role = "parent" | "student" | "teacher" | "admin";
export interface User {
  id: string;
  username: string;
  role: Role;
}
