import type { User } from "@/types";

export interface ValidateError {
  field: keyof User;
  message: string;
}

export const validate = (user: User): ValidateError[] => {
  const errors: ValidateError[] = [];

  if (!user.firstName.trim()) {
    errors.push({ field: "firstName", message: "First Name is required" });
  }

  if (!user.lastName.trim()) {
    errors.push({ field: "lastName", message: "Last Name is required" });
  }

  if (!user.email.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  return errors;
};
