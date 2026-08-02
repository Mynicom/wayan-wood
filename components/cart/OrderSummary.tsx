"use client";

import Image from "next/image";
import { useCart } from "./CartProvider";
import { parsePrice, formatPrice } from "./cart-utils";

export default function OrderSummary() {
  const { items, totalItems, subtotal } = useCart();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <h2 className="font-serif text-[1.25rem] font-bold text-[#1B1B1B] mb-6">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto">
        {items.map((item) => {
          const unitPrice = parsePrice(item.product.price);
          const itemSubtotal = unitPrice * item.quantity;
          return (
            <div key={item.product.id} className="flex gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#F8F6F2]">
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#1B1B1B] text-[0.8125rem] truncate">
                  {item.product.title}
                </h4>
                <p className="text-[0.75rem] text-[#666666] mt-0.5">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-[0.8125rem] font-semibold text-[#1B1B1B] flex-shrink-0">
                {formatPrice(itemSubtotal)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="border-t border-[#E7E3DD] pt-4 space-y-2">
        <div className="flex justify-between text-[0.875rem]">
          <span className="text-[#666666]">Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-[#1B1B1B]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[1.125rem] font-bold pt-2 border-t border-[#E7E3DD]">
          <span className="text-[#1B1B1B]">Total</span>
          <span className="text-[#1B1B1B]">{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
