import type { User } from "@/types";

const USER_KEY = "user_data";

/**
 * User
 */
export function saveUsers(users: User[]): void {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

export function getUsers(): User[] {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    console.log("Failed to parse user_data from localStorage");
    return [];
  }
}
