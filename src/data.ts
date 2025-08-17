import type { User } from "@/types";

export const initialUsers: User[] = [
  {
    id: crypto.randomUUID(),
    firstName: "Tom",
    lastName: "Yamada",
    email: "tom@example.com",
    date: new Date(),
    role: "Management",
  },
  {
    id: crypto.randomUUID(),
    firstName: "Mika",
    lastName: "Cole",
    email: "mika@example.com",
    date: new Date(),
    role: "Member",
  },
];
