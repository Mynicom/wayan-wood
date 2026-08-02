"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <CartProvider>
      {children}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <WhatsAppFloat />}
    </CartProvider>
  );
}
