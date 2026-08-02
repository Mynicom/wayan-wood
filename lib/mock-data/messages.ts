export interface MockContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

let nextMessageId = 100;

export function getNextMessageId() {
  return nextMessageId++;
}

export const mockMessages: MockContactMessage[] = [
  { id: 1, name: "Budi Santoso", email: "budi@email.com", phone: "081234567890", subject: "Custom Order", message: "Saya ingin memesan meja makan custom untuk 8 orang. Berapa harga dan waktu pengerjaannya?", status: "unread", createdAt: new Date("2024-12-01"), updatedAt: new Date("2024-12-01") },
  { id: 2, name: "Siti Rahayu", email: "siti@email.com", phone: "081234567891", subject: "Stock Inquiry", message: "Apakah Spice Rack masih tersedia? Saya ingin memesan 5 pcs.", status: "read", createdAt: new Date("2024-12-05"), updatedAt: new Date("2024-12-05") },
  { id: 3, name: "Ahmad Fauzi", email: "ahmad@email.com", phone: "081234567892", subject: "Shipping", message: "Apakah bisa dikirim ke Surabaya? Berapa ongkos kirimnya?", status: "unread", createdAt: new Date("2024-12-10"), updatedAt: new Date("2024-12-10") },
  { id: 4, name: "Dewi Lestari", email: "dewi@email.com", phone: "081234567893", subject: "Wholesale", message: "Saya pemilik toko furniture. Apakah ada harga khusus untuk pembelian grosir?", status: "read", createdAt: new Date("2024-12-15"), updatedAt: new Date("2024-12-15") },
  { id: 5, name: "Rizky Pratama", email: "rizky@email.com", phone: "081234567894", subject: "", message: "Produk yang saya pesan sudah diterima. Kualitasnya sangat bagus! Terima kasih.", status: "read", createdAt: new Date("2025-01-01"), updatedAt: new Date("2025-01-01") },
  { id: 6, name: "Maya Putri", email: "maya@email.com", phone: "081234567895", subject: "Custom Design", message: "Saya ingin memesan lemari pakaian dengan desain custom. Bisa konsultasi dulu?", status: "unread", createdAt: new Date("2025-01-05"), updatedAt: new Date("2025-01-05") },
  { id: 7, name: "Andi Wijaya", email: "andi@email.com", phone: "081234567896", subject: "Warranty", message: "Apakah ada garansi untuk produk furniture kayu ini?", status: "read", createdAt: new Date("2025-01-10"), updatedAt: new Date("2025-01-10") },
  { id: 8, name: "Rina Sari", email: "rina@email.com", phone: "081234567897", subject: "Payment", message: "Apakah bisa melakukan pembayaran dengan kartu kredit?", status: "unread", createdAt: new Date("2025-01-15"), updatedAt: new Date("2025-01-15") },
  { id: 9, name: "Hendra Kurniawan", email: "hendra@email.com", phone: "081234567898", subject: "Showroom Visit", message: "Saya ingin berkunjung ke showroom. Jam berapa buka?", status: "read", createdAt: new Date("2025-01-20"), updatedAt: new Date("2025-01-20") },
  { id: 10, name: "Lina Hartono", email: "lina@email.com", phone: "081234567899", subject: "Maintenance", message: "Bagaimana cara merawat furniture kayu agar tetap awet?", status: "read", createdAt: new Date("2025-01-25"), updatedAt: new Date("2025-01-25") },
];
