"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import CarouselDots from "@/components/ui/CarouselDots";

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Autoplay: berganti slide setiap 5 detik
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);
  }, [products.length]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const scrollPrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    startAutoplay();
  };

  const scrollNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
    startAutoplay();
  };

  const scrollTo = (index: number) => {
    setActiveIndex(index);
    startAutoplay();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      scrollPrev();
    } else if (info.offset.x < -threshold) {
      scrollNext();
    }
  };

  // Posisi card: active di tengah, card samping geser + scale + opacity
  const getCardProps = (index: number) => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);

    let xPos = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;

    if (diff === 0) {
      xPos = 0;
      scale = 1;
      opacity = 1;
      zIndex = 10;
    } else if (diff === -1 || (activeIndex === 0 && index === products.length - 1)) {
      xPos = -42;
      scale = 0.82;
      opacity = 0.6;
      zIndex = 5;
    } else if (diff === 1 || (activeIndex === products.length - 1 && index === 0)) {
      xPos = 42;
      scale = 0.82;
      opacity = 0.6;
      zIndex = 5;
    } else if (absDiff <= 2) {
      xPos = diff < 0 ? -60 : 60;
      scale = 0.7;
      opacity = 0;
      zIndex = 1;
    } else {
      xPos = diff < 0 ? -80 : 80;
      scale = 0.7;
      opacity = 0;
      zIndex = 1;
    }

    return { xPos, scale, opacity, zIndex };
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      role="region"
      aria-label="Product carousel"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-bold">
          New Arrivals
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="w-[2.75rem] h-[2.75rem] rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#3B2A1F] cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="w-[2.75rem] h-[2.75rem] rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#3B2A1F] cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Container carousel: tinggi menyesuaikan breakpoint */}
      <motion.div
        className="relative h-[380px] md:h-[520px] lg:h-[450px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {products.map((product, index) => {
          const { xPos, scale, opacity, zIndex } = getCardProps(index);

          return (
            // Ukuran card: 55% mobile, 45% tablet, 38% desktop
            <motion.div
              key={product.id}
              className="absolute w-[55%] md:w-[40%] lg:w-[38%]"
              animate={{
                x: `${xPos}%`,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link href={`/product/${product.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 55vw, (max-width: 1024px) 45vw, 38vw"
                      className="object-cover"
                      draggable={false}


                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-[#1B1B1B] text-[0.875rem] md:text-[1rem]">
                      {product.title}
                    </h3>
                    <p className="text-[0.625rem] md:text-[0.75rem] text-[#C89B5B] mt-1">
                      {product.category}
                    </p>
                    <p className="font-bold text-[#1B1B1B] text-[0.875rem] md:text-[1rem] mt-2">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dots */}
      <div className="mt-6">
        <CarouselDots
          total={products.length}
          activeIndex={activeIndex}
          onDotClick={scrollTo}
          color="white"
        />
      </div>
    </div>
  );
}
