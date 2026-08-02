import { CartItem, CheckoutFormData } from "@/types/cart";

const CART_STORAGE_KEY = "wayan-wood-cart";

export function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function storeCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable
  }
}

export function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
}

export function formatPrice(price: number): string {
  return `Rp. ${price.toLocaleString("id-ID")}`;
}

export function generateWhatsAppMessage(
  items: CartItem[],
  formData: CheckoutFormData,
  total: number
): string {
  const lines = items.map((item) => {
    const itemTotal = parsePrice(item.product.price) * item.quantity;
    const productUrl = `https://wayanwoodwork.com/product/${item.product.slug}`;
    return [
      `*${item.product.title}*`,
      `🔗 ${productUrl}`,
      `Qty : ${item.quantity}`,
      `Harga : ${item.product.price}`,
      `Subtotal : ${formatPrice(itemTotal)}`,
      "--------------------------------",
    ].join("\n");
  });

  return [
    "Halo Wayan Wood Work,",
    "",
    "Saya ingin memesan furniture berikut:",
    "",
    "--------------------------------",
    "",
    ...lines,
    "",
    `*TOTAL*`,
    `*${formatPrice(total)}*`,
    "",
    `Nama : ${formData.name}`,
    `Nomor WA : ${formData.phone}`,
    `Kota : ${formData.city}`,
    `Alamat : ${formData.address}`,
    `Catatan : ${formData.note || "-"}`,
    "",
    "Mohon informasi stok dan estimasi pengiriman.",
    "Terima kasih.",
  ].join("\n");
}

export const WHATSAPP_NUMBER = "6281338246791";
