"use client";

import Image from "next/image";
import HeroContent from "./HeroContent";
import ProductCarousel from "./ProductCarousel";
import { Product } from "@/types/product";

interface HeroProps {
  products: Product[];
}

export default function Hero({ products }: HeroProps) {
  return (
    <section id="hero" className="relative w-full min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop"
          alt="Woodcraft background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/35" />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 flex items-center pt-[100px] lg:pt-0 lg:min-h-[100dvh]">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-8 items-center w-full py-20 lg:py-0">
          <HeroContent />
          <div className="animate-[fadeSlideIn_0.6s_ease-out_0.3s_both]">
            <ProductCarousel products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
