export interface MockUser {
  id: string;
  name: string | null;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    name: "Admin",
    email: "admin@wayanwood.com",
    password: "$2b$10$tO5P9qw0Xw81MdJh4BXey.BKRcOiN/ynT3w9rDAS3jHwesLWayVxi", // password123
    role: "super_admin",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "user-2",
    name: "Staff",
    email: "staff@wayanwood.com",
    password: "$2b$10$tO5P9qw0Xw81MdJh4BXey.BKRcOiN/ynT3w9rDAS3jHwesLWayVxi", // password123
    role: "admin",
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
];
