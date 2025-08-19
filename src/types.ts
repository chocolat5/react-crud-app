export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Management" | "Member";
}

export interface Auth {
  email: string;
  password: string;
}
