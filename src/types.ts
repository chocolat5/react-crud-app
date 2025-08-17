export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
  role: "Management" | "Member";
}
