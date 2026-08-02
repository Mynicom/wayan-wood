export interface PageContent {
  id: string;
  title: string;
  content: string;
}

export const pagesData: PageContent[] = [
  {
    id: "care-guide",
    title: "Care Guide",
    content: `Cara Merawat Furniture Kayu Wayan Wood Work

1. Hindari Paparan Sinar Matahari Langsung
Letakkan furniture kayu jauh dari sinar matahari langsung untuk menghindari perubahan warna dan retakan pada permukaan kayu.

2. Gunakan Coaster dan Table Mat
Selalu gunakan alas gelas dan piring untuk melindungi permukaan kayu dari noda air dan panas.

3. Bersihkan Secara Teratur
Gunakan kain lembut yang sedikit lembap untuk membersihkan debu. Hindari penggunaan bahan kimia keras yang dapat merusak finishing.

4. Jaga Kelembaban Ruangan
Kayu membutuhkan kelembaban yang stabil. Gunakan humidifier di ruangan dengan AC untuk menjaga kualitas kayu.

5. Hindari Benda Tajam
Gunakan tatakan saat meletakkan benda tajam untuk menggores permukaan kayu.

6. Perawatan Finishing
Setiap 6-12 bulan, aplikasikan minyak kayu atau polish khusus untuk menjaga kilau dan perlindungan finishing.

Hubungi kami untuk konsultasi perawatan lebih lanjut.`,
  },
  {
    id: "faq",
    title: "FAQ (Frequently Asked Questions)",
    content: `Pertanyaan yang Sering Ditanyakan

Q: Berapa lama waktu pengerjaan?
A: Waktu pengerjaan bervariasi tergantung kompleksitas desain. Rata-rata 5-10 hari kerja untuk produk standar, dan 2-4 minggu untuk custom order.

Q: Apakah bisa pesan desain custom?
A: Ya, kami menerima pesanan custom. Silakan hubungi kami untuk konsultasi desain dan estimasi harga.

Q: Apakah ada minimal order?
A: Minimal order untuk produk standar adalah 10 pcs. Untuk custom order, silakan hubungi kami.

Q: Ke mana saja pengiriman dilakukan?
A: Kami melayani pengiriman ke seluruh Indonesia dengan packing khusus untuk menjaga kualitas produk.

Q: Apakah ada garansi?
A: Ya, kami memberikan garansi 1 tahun untuk setiap produk kami dari cacat produksi.

Q: Bagaimana cara pembayaran?
A: Kami menerima pembayaran via transfer bank, e-wallet, dan kartu kredit.

Q: Apakah bisa COD?
A: Untuk wilayah Bali, COD tersedia dengan syarat dan ketentuan berlaku.`,
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: `Kebijakan Privasi Wayan Wood Work

Terakhir diperbarui: Januari 2024

1. Informasi yang Kami Kumpulkan
Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, email, nomor telepon, dan alamat saat Anda menghubungi kami atau melakukan pemesanan.

2. Penggunaan Informasi
Informasi yang kami kumpulkan digunakan untuk:
- Memproses pesanan dan pengiriman
- Menghubungi Anda mengenai pesanan
- Mengirim informasi produk dan promosi (dengan persetujuan Anda)
- Meningkatkan layanan kami

3. Perlindungan Informasi
Kami menerapkan langkah-langkah keamanan untuk melindungi informasi pribadi Anda dari akses yang tidak sah.

4. Berbagi Informasi
Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga.

5. Cookie
Website kami menggunakan cookie untuk meningkatkan pengalaman browsing Anda.

6. Hak Anda
Anda berhak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda kapan saja.

7. Hubungi Kami
Jika ada pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami di wayanwoodwork@gmail.com.`,
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    content: `Syarat dan Ketentuan Wayan Wood Work

Terakhir diperbarui: Januari 2024

1. Pemesanan
- Pemesanan dianggap sah setelah pembayaran DP diterima
- Harga yang tercantum dapat berubah sewaktu-waktu tanpa pemberitahuan
- Waktu pengerjaan mulai setelah pembayaran DP diterima

2. Pembayaran
- DP sebesar 50% wajib dibayar saat pemesanan
- Pelunasan dilakukan sebelum pengiriman
- Pembayaran via transfer bank atau e-wallet

3. Pengiriman
- Pengiriman dilakukan setelah pelunasan
- Risiko kerusakan selama pengiriman menjadi tanggung jawab ekspedisi
- Kami menggunakan packing khusus untuk menjaga kualitas produk

4. Garansi
- Garansi 1 tahun untuk cacat produksi
- Tidak berlaku untuk kerusakan akibat penggunaan yang tidak semestinya
- Klaim garansi harus disertai bukti pembelian

5. Pengembalian
- Pengembalian hanya diterima jika produk cacat atau rusak saat diterima
- Pengajuan pengembalian maksimal 3 hari setelah produk diterima

6. Force Majeure
Kami tidak bertanggung jawab atas keterlambatan atau kegagalan pengiriman akibat keadaan di luar kendali kami.`,
  },
];

export function getPageById(id: string): PageContent | undefined {
  return pagesData.find((page) => page.id === id);
}
