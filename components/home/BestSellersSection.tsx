"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import CarouselDots from "@/components/ui/CarouselDots";

interface BestSellersSectionProps {
  products: Product[];
}

export default function BestSellersSection({ products }: BestSellersSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Konfigurasi carousel: loop, autoplay 5 detik, berhenti saat hover
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    const handleReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      handleSelect();
    };

    handleReInit();

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleReInit);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleReInit);
    };
  }, [emblaApi]);

  return (
    <section id="best-sellers" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <SectionHeader
          title="Best Sellers"
          actionLabel="View All"
          actionHref="/collections"
        />

        {/* Carousel produk: flex layout dengan pl-6 sebagai gap */}
        <div className="overflow-hidden py-5" ref={emblaRef}>
          <div className="flex -ml-6">
            {products.map((product) => (
              // Ukuran slide: 50% mobile (2 card), 25% desktop (4 card)
              <div
                key={product.id}
                className="flex-[0_0_50%] md:flex-[0_0_25%] min-w-0 pl-6"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <CarouselDots
          total={scrollSnaps.length}
          activeIndex={selectedIndex}
          onDotClick={scrollTo}
          color="dark"
        />
      </div>
    </section>
  );
}
