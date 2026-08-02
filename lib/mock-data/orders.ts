export interface MockOrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
    thumbnail: string;
  };
}

export interface MockOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  notes: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  items?: MockOrderItem[];
}

let nextOrderId = 100;
let nextOrderItemId = 1000;

export function getNextOrderId() {
  return nextOrderId++;
}

export function getNextOrderItemId() {
  return nextOrderItemId++;
}

export const mockOrders: MockOrder[] = [
  {
    id: 1, orderNumber: "ORD-001", customerName: "Budi Santoso", email: "budi@email.com", phone: "081234567890", address: "Jakarta Selatan", totalAmount: 2400000, notes: "", status: "completed", createdAt: new Date("2024-07-01"), updatedAt: new Date("2024-07-01"),
    items: [{ id: 1, orderId: 1, productId: 1, quantity: 2, price: 1200000, product: { name: "Spice Rack", thumbnail: "https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8?w=360&h=480&fit=crop" } }],
  },
  {
    id: 2, orderNumber: "ORD-002", customerName: "Siti Rahayu", email: "siti@email.com", phone: "081234567891", address: "Bandung", totalAmount: 550000, notes: "", status: "completed", createdAt: new Date("2024-07-05"), updatedAt: new Date("2024-07-05"),
    items: [{ id: 2, orderId: 2, productId: 2, quantity: 1, price: 550000, product: { name: "Cutting Board", thumbnail: "https://images.unsplash.com/photo-1765120828282-63dc950b6f90?w=360&h=480&fit=crop" } }],
  },
  {
    id: 3, orderNumber: "ORD-003", customerName: "Ahmad Fauzi", email: "ahmad@email.com", phone: "081234567892", address: "Surabaya", totalAmount: 1680000, notes: "", status: "completed", createdAt: new Date("2024-07-10"), updatedAt: new Date("2024-07-10"),
    items: [{ id: 3, orderId: 3, productId: 3, quantity: 2, price: 680000, product: { name: "Serving Tray", thumbnail: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=360&h=480&fit=crop" } }, { id: 4, orderId: 3, productId: 2, quantity: 1, price: 320000, product: { name: "Cutting Board", thumbnail: "https://images.unsplash.com/photo-1765120828282-63dc950b6f90?w=360&h=480&fit=crop" } }],
  },
  {
    id: 4, orderNumber: "ORD-004", customerName: "Dewi Lestari", email: "dewi@email.com", phone: "081234567893", address: "Yogyakarta", totalAmount: 1000000, notes: "", status: "completed", createdAt: new Date("2024-07-15"), updatedAt: new Date("2024-07-15"),
    items: [{ id: 5, orderId: 4, productId: 4, quantity: 1, price: 1000000, product: { name: "Wooden Tray Cart", thumbnail: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=360&h=480&fit=crop" } }],
  },
  {
    id: 5, orderNumber: "ORD-005", customerName: "Rizky Pratama", email: "rizky@email.com", phone: "081234567894", address: "Semarang", totalAmount: 1700000, notes: "", status: "completed", createdAt: new Date("2024-08-01"), updatedAt: new Date("2024-08-01"),
    items: [{ id: 6, orderId: 5, productId: 5, quantity: 2, price: 850000, product: { name: "Wooden Soap Dispenser", thumbnail: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=360&h=480&fit=crop" } }],
  },
  {
    id: 6, orderNumber: "ORD-006", customerName: "Maya Putri", email: "maya@email.com", phone: "081234567895", address: "Malang", totalAmount: 950000, notes: "", status: "completed", createdAt: new Date("2024-08-10"), updatedAt: new Date("2024-08-10"),
    items: [{ id: 7, orderId: 6, productId: 6, quantity: 1, price: 950000, product: { name: "Luxury Tray", thumbnail: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=360&h=480&fit=crop" } }],
  },
  {
    id: 7, orderNumber: "ORD-007", customerName: "Andi Wijaya", email: "andi@email.com", phone: "081234567896", address: "Denpasar", totalAmount: 1350000, notes: "", status: "completed", createdAt: new Date("2024-08-15"), updatedAt: new Date("2024-08-15"),
    items: [{ id: 8, orderId: 7, productId: 7, quantity: 1, price: 1350000, product: { name: "Laundry Basket", thumbnail: "https://images.unsplash.com/photo-1628304457638-562e9c885708?w=360&h=480&fit=crop" } }],
  },
  {
    id: 8, orderNumber: "ORD-008", customerName: "Rina Sari", email: "rina@email.com", phone: "081234567897", address: "Bali", totalAmount: 1560000, notes: "", status: "completed", createdAt: new Date("2024-09-01"), updatedAt: new Date("2024-09-01"),
    items: [{ id: 9, orderId: 8, productId: 8, quantity: 2, price: 780000, product: { name: "Wooden Tissue Box", thumbnail: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=360&h=480&fit=crop" } }],
  },
  {
    id: 9, orderNumber: "ORD-009", customerName: "Hendra Kurniawan", email: "hendra@email.com", phone: "081234567898", address: "Medan", totalAmount: 650000, notes: "", status: "completed", createdAt: new Date("2024-09-10"), updatedAt: new Date("2024-09-10"),
    items: [{ id: 10, orderId: 9, productId: 9, quantity: 1, price: 650000, product: { name: "Towel Rack", thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=360&h=480&fit=crop" } }],
  },
  {
    id: 10, orderNumber: "ORD-010", customerName: "Lina Hartono", email: "lina@email.com", phone: "081234567899", address: "Palembang", totalAmount: 890000, notes: "", status: "completed", createdAt: new Date("2024-09-15"), updatedAt: new Date("2024-09-15"),
    items: [{ id: 11, orderId: 10, productId: 10, quantity: 1, price: 890000, product: { name: "Storage Basket", thumbnail: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=360&h=480&fit=crop" } }],
  },
  {
    id: 11, orderNumber: "ORD-011", customerName: "Fajar Nugroho", email: "fajar@email.com", phone: "081234567800", address: "Makassar", totalAmount: 780000, notes: "", status: "completed", createdAt: new Date("2024-10-01"), updatedAt: new Date("2024-10-01"),
    items: [{ id: 12, orderId: 11, productId: 11, quantity: 1, price: 780000, product: { name: "Tissue Box Cover", thumbnail: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=360&h=480&fit=crop" } }],
  },
  {
    id: 12, orderNumber: "ORD-012", customerName: "Wati Susilowati", email: "wati@email.com", phone: "081234567801", address: "Solo", totalAmount: 950000, notes: "", status: "completed", createdAt: new Date("2024-10-10"), updatedAt: new Date("2024-10-10"),
    items: [{ id: 13, orderId: 12, productId: 12, quantity: 1, price: 950000, product: { name: "Plant Stand", thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=360&h=480&fit=crop" } }],
  },
  {
    id: 13, orderNumber: "ORD-013", customerName: "Yoga Pratama", email: "yoga@email.com", phone: "081234567802", address: "Pontianak", totalAmount: 2400000, notes: "", status: "completed", createdAt: new Date("2024-10-15"), updatedAt: new Date("2024-10-15"),
    items: [{ id: 14, orderId: 13, productId: 1, quantity: 2, price: 1200000, product: { name: "Spice Rack", thumbnail: "https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8?w=360&h=480&fit=crop" } }],
  },
  {
    id: 14, orderNumber: "ORD-014", customerName: "Putri Amelia", email: "putri@email.com", phone: "081234567803", address: "Banjarmasin", totalAmount: 1700000, notes: "", status: "completed", createdAt: new Date("2024-11-01"), updatedAt: new Date("2024-11-01"),
    items: [{ id: 15, orderId: 14, productId: 5, quantity: 2, price: 850000, product: { name: "Wooden Soap Dispenser", thumbnail: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=360&h=480&fit=crop" } }],
  },
  {
    id: 15, orderNumber: "ORD-015", customerName: "Dimas Aditya", email: "dimas@email.com", phone: "081234567804", address: "Manado", totalAmount: 1350000, notes: "", status: "completed", createdAt: new Date("2024-11-10"), updatedAt: new Date("2024-11-10"),
    items: [{ id: 16, orderId: 15, productId: 7, quantity: 1, price: 1350000, product: { name: "Laundry Basket", thumbnail: "https://images.unsplash.com/photo-1628304457638-562e9c885708?w=360&h=480&fit=crop" } }],
  },
  {
    id: 16, orderNumber: "ORD-016", customerName: "Novi Handayani", email: "novi@email.com", phone: "081234567805", address: "Jayapura", totalAmount: 950000, notes: "", status: "completed", createdAt: new Date("2024-11-15"), updatedAt: new Date("2024-11-15"),
    items: [{ id: 17, orderId: 16, productId: 12, quantity: 1, price: 950000, product: { name: "Plant Stand", thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=360&h=480&fit=crop" } }],
  },
  {
    id: 17, orderNumber: "ORD-017", customerName: "Reza Fahlevi", email: "reza@email.com", phone: "081234567806", address: "Padang", totalAmount: 890000, notes: "", status: "completed", createdAt: new Date("2024-12-01"), updatedAt: new Date("2024-12-01"),
    items: [{ id: 18, orderId: 17, productId: 10, quantity: 1, price: 890000, product: { name: "Storage Basket", thumbnail: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=360&h=480&fit=crop" } }],
  },
  {
    id: 18, orderNumber: "ORD-018", customerName: "Eka Wulandari", email: "eka@email.com", phone: "081234567807", address: "Lampung", totalAmount: 650000, notes: "", status: "completed", createdAt: new Date("2024-12-10"), updatedAt: new Date("2024-12-10"),
    items: [{ id: 19, orderId: 18, productId: 9, quantity: 1, price: 650000, product: { name: "Towel Rack", thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=360&h=480&fit=crop" } }],
  },
  {
    id: 19, orderNumber: "ORD-019", customerName: "Taufik Rahman", email: "taufik@email.com", phone: "081234567808", address: "Batam", totalAmount: 1900000, notes: "", status: "completed", createdAt: new Date("2025-01-01"), updatedAt: new Date("2025-01-01"),
    items: [{ id: 20, orderId: 19, productId: 6, quantity: 2, price: 950000, product: { name: "Luxury Tray", thumbnail: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=360&h=480&fit=crop" } }],
  },
  {
    id: 20, orderNumber: "ORD-020", customerName: "Angga Prasetyo", email: "angga@email.com", phone: "081234567809", address: "Balikpapan", totalAmount: 1680000, notes: "", status: "completed", createdAt: new Date("2025-01-10"), updatedAt: new Date("2025-01-10"),
    items: [{ id: 21, orderId: 20, productId: 3, quantity: 2, price: 680000, product: { name: "Serving Tray", thumbnail: "https://images.unsplash.com/photo-1566770050648-8447d2d40f1e?w=360&h=480&fit=crop" } }, { id: 22, orderId: 20, productId: 11, quantity: 1, price: 320000, product: { name: "Tissue Box Cover", thumbnail: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=360&h=480&fit=crop" } }],
  },
];
