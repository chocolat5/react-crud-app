import type { User } from "@/types";

export const initialUsers: User[] = [
  {
    id: crypto.randomUUID().slice(0, 8),
    firstName: "Tom",
    lastName: "Yamada",
    email: "tom@example.com",
    role: "Management",
  },
  {
    id: crypto.randomUUID().slice(0, 8),
    firstName: "Mika",
    lastName: "Cole",
    email: "mika@example.com",
    role: "Member",
  },
];
