"use client";

import { useRouter } from "next/navigation";
import { formatPrice } from "./cart-utils";
import { useCart } from "./CartProvider";
import { ShoppingCart } from "lucide-react";

interface CartSummaryProps {
  showButtons?: boolean;
}

export default function CartSummary({ showButtons = true }: CartSummaryProps) {
  const { items, totalItems, subtotal, closeDrawer } = useCart();
  const router = useRouter();

  return (
    <div className="border-t border-[#E7E3DD] pt-4 mt-auto">
      {/* Summary */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-[0.875rem]">
          <span className="text-[#666666]">Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-[#1B1B1B]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[1rem] font-bold pt-2 border-t border-[#E7E3DD]">
          <span className="text-[#1B1B1B]">Total</span>
          <span className="text-[#1B1B1B]">{formatPrice(subtotal)}</span>
        </div>
      </div>

      {showButtons && items.length > 0 && (
        <div className="space-y-3">
          <button
            onClick={() => {
              closeDrawer();
              router.push("/checkout");
            }}
            className="w-full bg-[#C89B5B] text-black font-semibold text-[0.875rem] py-3 px-8 rounded-full hover:bg-[#B08A4A] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Checkout via WhatsApp
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
          <button
            onClick={() => {
              closeDrawer();
              router.push("/cart");
            }}
            className="w-full text-[#3B2A1F] border border-[#3B2A1F] font-semibold text-[0.875rem] py-3 px-8 rounded-full hover:bg-[#3B2A1F] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <ShoppingCart className="w-12 h-12 text-[#E7E3DD] mb-4" />
          <p className="text-[#666666] text-[0.9375rem] mb-4">Your cart is empty.</p>
          <button
            onClick={() => {
              closeDrawer();
              router.push("/collections");
            }}
            className="bg-[#C89B5B] text-black font-semibold text-[0.875rem] py-3 px-8 rounded-full hover:bg-[#B08A4A] transition-all duration-300 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
