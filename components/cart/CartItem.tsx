"use client";

import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { parsePrice, formatPrice } from "./cart-utils";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const unitPrice = parsePrice(product.price);
  const subtotal = unitPrice * quantity;

  return (
    <div className="flex gap-3 py-4 border-b border-[#E7E3DD] last:border-b-0">
      {/* Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F8F6F2]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="80px"
          className="object-cover"


        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1B1B1B] text-[0.875rem] truncate">
          {product.title}
        </h4>
        <p className="text-[#C89B5B] font-semibold text-[0.8125rem] mt-0.5">
          {product.price}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="w-7 h-7 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:bg-[#F8F6F2] transition-colors cursor-pointer"
              aria-label={`Decrease quantity of ${product.title}`}
            >
              <Minus className="w-3 h-3 text-[#666666]" />
            </button>
            <span className="text-[0.875rem] font-semibold text-[#1B1B1B] w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="w-7 h-7 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:bg-[#F8F6F2] transition-colors cursor-pointer"
              aria-label={`Increase quantity of ${product.title}`}
            >
              <Plus className="w-3 h-3 text-[#666666]" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[0.8125rem] font-semibold text-[#1B1B1B]">
              {formatPrice(subtotal)}
            </span>
            <button
              onClick={() => onRemove(product.id)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer"
              aria-label={`Remove ${product.title} from cart`}
            >
              <X className="w-3.5 h-3.5 text-[#666666] hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
