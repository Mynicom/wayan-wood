"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import CartBadge from "@/components/cart/CartBadge";
import { useCart } from "@/components/cart/CartProvider";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
  const { openDrawer } = useCart();

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  const isSolidBg = !isHome || isScrolled;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolidBg ? "header-scrolled bg-white" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Wayan Wood Work" width={40} height={40} className="rounded-full" />
            <span
              className={`font-serif text-[0.875rem] tracking-wide ${
                isSolidBg ? "text-[#3B2A1F]" : "text-white"
              }`}
            >
              WAYAN WOOD WORK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive =
                (link.href === "/collections" && pathname.startsWith("/collections")) ||
                (link.href === "/about" && pathname === "/about") ||
                (link.href !== "/collections" && link.href !== "/about" && pathname === link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-[0.875rem] transition-colors duration-300 pb-1 ${
                    isActive
                      ? "text-[#C89B5B] font-semibold"
                      : isSolidBg
                        ? "text-[#666666] hover:text-[#D4A96A]"
                        : "text-white/80 hover:text-[#D4A96A]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C89B5B] transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className={`w-[240px] h-[44px] rounded-full px-5 pr-12 text-[0.875rem] focus:outline-none transition-all duration-300 ${
                  isSolidBg
                    ? "bg-[#F8F6F2] text-[#3B2A1F] placeholder-[#666666] border border-[#E7E3DD]"
                    : "bg-transparent text-white placeholder-white/60 border-2 border-white"
                }`}
              />
              <Search
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isSolidBg ? "text-[#666666]" : "text-white"
                }`}
              />
            </div>

            {/* Cart Button */}
            <button
              onClick={openDrawer}
              className={`relative w-[44px] h-[44px] rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                isSolidBg
                  ? "hover:bg-[#F8F6F2] text-[#3B2A1F]"
                  : "hover:bg-white/10 text-white"
              }`}
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <CartBadge />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={openDrawer}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                isSolidBg ? "text-[#3B2A1F]" : "text-white"
              }`}
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <CartBadge />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isSolidBg ? "text-[#3B2A1F]" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isSolidBg ? "text-[#3B2A1F]" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E7E3DD]">
          <div className="px-5 py-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search Furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full h-[44px] rounded-full bg-[#F8F6F2] text-[#3B2A1F] placeholder-[#666666] px-5 pr-12 text-[0.875rem] focus:outline-none border border-[#E7E3DD]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  (link.href === "/collections" && pathname.startsWith("/collections")) ||
                  (link.href === "/about" && pathname === "/about") ||
                  (link.href !== "/collections" && link.href !== "/about" && pathname === link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-[0.875rem] py-2.5 px-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-[#C89B5B] font-semibold bg-[#C89B5B]/10"
                        : "text-[#666666] hover:text-[#3B2A1F] hover:bg-[#C89B5B]/5"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
