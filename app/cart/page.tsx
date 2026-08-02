"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, X, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/components/cart/CartProvider";
import { parsePrice, formatPrice } from "@/components/cart/cart-utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, subtotal } = useCart();

  return (
    <>
      <Navbar />
      <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-10">
          <h1 className="font-serif text-[#1B1B1B] text-[1.75rem] md:text-[2rem] font-bold mb-8">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingCart className="w-16 h-16 text-[#E7E3DD] mb-4" />
              <p className="text-[#666666] text-[1rem] mb-2">Your cart is empty.</p>
              <p className="text-[#999999] text-[0.875rem] mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link
                href="/collections"
                className="bg-[#C89B5B] text-black font-semibold text-[0.875rem] py-3 px-8 rounded-full hover:bg-[#B08A4A] transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Cart Table */}
              <div className="flex-1">
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E7E3DD]">
                        <th className="text-left text-[0.8125rem] font-semibold text-[#666666] pb-4 uppercase tracking-wide">
                          Product
                        </th>
                        <th className="text-left text-[0.8125rem] font-semibold text-[#666666] pb-4 uppercase tracking-wide">
                          Price
                        </th>
                        <th className="text-center text-[0.8125rem] font-semibold text-[#666666] pb-4 uppercase tracking-wide">
                          Qty
                        </th>
                        <th className="text-right text-[0.8125rem] font-semibold text-[#666666] pb-4 uppercase tracking-wide">
                          Subtotal
                        </th>
                        <th className="w-10 pb-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => {
                        const unitPrice = parsePrice(item.product.price);
                        const itemSubtotal = unitPrice * item.quantity;
                        return (
                          <tr key={item.product.id} className="border-b border-[#E7E3DD]">
                            <td className="py-5">
                              <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F8F6F2]">
                                  <Image
                                    src={item.product.image}
                                    alt={item.product.title}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <Link
                                    href={`/product/${item.product.slug}`}
                                    className="font-semibold text-[#1B1B1B] text-[0.9375rem] hover:text-[#C89B5B] transition-colors"
                                  >
                                    {item.product.title}
                                  </Link>
                                  <p className="text-[0.8125rem] text-[#666666] mt-0.5">
                                    {item.product.category.split(",")[0]?.trim()}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-5 text-[0.9375rem] text-[#1B1B1B]">
                              {item.product.price}
                            </td>
                            <td className="py-5">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:bg-[#F8F6F2] transition-colors cursor-pointer"
                                  aria-label={`Decrease quantity of ${item.product.title}`}
                                >
                                  <Minus className="w-3 h-3 text-[#666666]" />
                                </button>
                                <span className="text-[0.9375rem] font-semibold text-[#1B1B1B] w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:bg-[#F8F6F2] transition-colors cursor-pointer"
                                  aria-label={`Increase quantity of ${item.product.title}`}
                                >
                                  <Plus className="w-3 h-3 text-[#666666]" />
                                </button>
                              </div>
                            </td>
                            <td className="py-5 text-right text-[0.9375rem] font-semibold text-[#1B1B1B]">
                              {formatPrice(itemSubtotal)}
                            </td>
                            <td className="py-5 pl-3">
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer"
                                aria-label={`Remove ${item.product.title} from cart`}
                              >
                                <X className="w-4 h-4 text-[#666666] hover:text-red-500" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List */}
                <div className="md:hidden space-y-4">
                  {items.map((item) => {
                    const unitPrice = parsePrice(item.product.price);
                    const itemSubtotal = unitPrice * item.quantity;
                    return (
                      <div
                        key={item.product.id}
                        className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F8F6F2]">
                            <Image
                              src={item.product.image}
                              alt={item.product.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="font-semibold text-[#1B1B1B] text-[0.9375rem] hover:text-[#C89B5B] transition-colors block truncate"
                            >
                              {item.product.title}
                            </Link>
                            <p className="text-[#C89B5B] font-semibold text-[0.8125rem] mt-0.5">
                              {item.product.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer self-start"
                            aria-label={`Remove ${item.product.title} from cart`}
                          >
                            <X className="w-4 h-4 text-[#666666]" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E7E3DD]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:bg-[#F8F6F2] transition-colors cursor-pointer"
                              aria-label={`Decrease quantity of ${item.product.title}`}
                            >
                              <Minus className="w-3 h-3 text-[#666666]" />
                            </button>
                            <span className="text-[0.9375rem] font-semibold text-[#1B1B1B] w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:bg-[#F8F6F2] transition-colors cursor-pointer"
                              aria-label={`Increase quantity of ${item.product.title}`}
                            >
                              <Plus className="w-3 h-3 text-[#666666]" />
                            </button>
                          </div>
                          <span className="text-[0.9375rem] font-bold text-[#1B1B1B]">
                            {formatPrice(itemSubtotal)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="w-full lg:w-[360px] flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] sticky top-[100px]">
                  <h2 className="font-serif text-[1.25rem] font-bold text-[#1B1B1B] mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[0.9375rem]">
                      <span className="text-[#666666]">Subtotal ({totalItems} items)</span>
                      <span className="font-semibold text-[#1B1B1B]">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[0.9375rem]">
                      <span className="text-[#666666]">Shipping</span>
                      <span className="text-[#666666] text-[0.8125rem]">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-[1.125rem] font-bold pt-3 border-t border-[#E7E3DD]">
                      <span className="text-[#1B1B1B]">Total</span>
                      <span className="text-[#1B1B1B]">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="w-full bg-[#C89B5B] text-black font-semibold text-[0.875rem] py-3 px-8 rounded-full hover:bg-[#B08A4A] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Checkout via WhatsApp
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </Link>
                    <Link
                      href="/collections"
                      className="w-full text-[#3B2A1F] border border-[#3B2A1F] font-semibold text-[0.875rem] py-3 px-8 rounded-full hover:bg-[#3B2A1F] hover:text-white transition-all duration-300 flex items-center justify-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
