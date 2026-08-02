export interface MockActivityLog {
  id: number;
  type: string;
  message: string;
  createdAt: Date;
}

let nextActivityId = 100;

export function getNextActivityId() {
  return nextActivityId++;
}

export const mockActivityLogs: MockActivityLog[] = [
  { id: 1, type: "product", message: 'Produk baru "Spice Rack" ditambahkan', createdAt: new Date("2024-01-15T10:00:00") },
  { id: 2, type: "product", message: 'Produk baru "Cutting Board" ditambahkan', createdAt: new Date("2024-02-01T11:30:00") },
  { id: 3, type: "order", message: "Pesanan baru ORD-001 dari Budi Santoso", createdAt: new Date("2024-07-01T09:15:00") },
  { id: 4, type: "message", message: "Pesan baru dari Budi Santoso - Custom Order", createdAt: new Date("2024-12-01T14:20:00") },
  { id: 5, type: "settings", message: "Website settings diperbarui", createdAt: new Date("2024-12-15T08:45:00") },
  { id: 6, type: "product", message: 'Produk "Spice Rack" diperbarui', createdAt: new Date("2025-01-01T10:30:00") },
  { id: 7, type: "order", message: "Pesanan baru ORD-019 dari Taufik Rahman", createdAt: new Date("2025-01-01T15:00:00") },
  { id: 8, type: "message", message: "Pesan baru dari Maya Putri - Custom Design", createdAt: new Date("2025-01-05T09:00:00") },
  { id: 9, type: "product", message: 'Produk baru "Plant Stand" ditambahkan', createdAt: new Date("2025-01-08T13:15:00") },
  { id: 10, type: "order", message: "Pesanan baru ORD-020 dari Angga Prasetyo", createdAt: new Date("2025-01-10T11:45:00") },
];
