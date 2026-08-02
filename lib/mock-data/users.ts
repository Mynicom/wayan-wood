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
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "super_admin",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "user-2",
    name: "Staff",
    email: "staff@wayanwood.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "admin",
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
];
