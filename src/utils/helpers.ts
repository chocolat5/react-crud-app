import type { User } from "@/types";

const USER_KEY = "user_data";
const LOGIN_KEY = "loggedin";

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

/**
 * Login
 */
export function saveLoginState(isLoggedIn: boolean): void {
  localStorage.setItem(LOGIN_KEY, String(isLoggedIn));
}

export function getLoginState(): boolean {
  return localStorage.getItem(LOGIN_KEY) === "true";
}

export function clearLoginState(): void {
  localStorage.removeItem(LOGIN_KEY);
}
