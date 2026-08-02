"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutForm from "@/components/cart/CheckoutForm";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCart } from "@/components/cart/CartProvider";
import { CheckoutFormData } from "@/types/cart";
import { generateWhatsAppMessage, WHATSAPP_NUMBER, parsePrice } from "@/components/cart/cart-utils";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (formData: CheckoutFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: parsePrice(item.product.price),
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          address: `${formData.city}, ${formData.address}`,
          notes: formData.note || "",
          items: orderItems,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Gagal membuat pesanan");
        setIsSubmitting(false);
        return;
      }

      const message = generateWhatsAppMessage(items, formData, subtotal);
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
      clearCart();
      router.push("/");
    } catch {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-20">
            <div className="flex flex-col items-center justify-center text-center">
              <ShoppingCart className="w-16 h-16 text-[#E7E3DD] mb-4" />
              <p className="text-[#666666] text-[1rem] mb-2">Your cart is empty.</p>
              <p className="text-[#999999] text-[0.875rem] mb-6">
                Add some products before checking out.
              </p>
              <Link
                href="/collections"
                className="bg-[#C89B5B] text-black font-semibold text-[0.875rem] py-3 px-8 rounded-full hover:bg-[#B08A4A] transition-all duration-300"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-10">
          <nav className="mb-8">
            <p className="text-[0.875rem] text-[#666666]">
              <Link href="/cart" className="hover:text-[#C89B5B] transition-colors">
                Cart
              </Link>
              <span className="mx-1">/</span>
              <span className="text-[#1B1B1B]">Checkout</span>
            </p>
          </nav>

          <h1 className="font-serif text-[#1B1B1B] text-[1.75rem] md:text-[2rem] font-bold mb-8">
            Checkout
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              <CheckoutForm onSubmit={handleCheckout} />
            </div>
            <div className="w-full lg:w-[400px] flex-shrink-0">
              <div className="sticky top-[100px]">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
