"use client";

import { useCart } from "./CartProvider";

export default function CartBadge() {
  const { totalItems } = useCart();

  return (
    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[#C89B5B] text-white text-[0.625rem] font-bold rounded-full flex items-center justify-center leading-none">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  );
}
