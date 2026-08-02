"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import CarouselDots from "@/components/ui/CarouselDots";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

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
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <SectionHeader title="Shop by Categories" />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-[0_0_50%] md:flex-[0_0_25%] min-w-0 pl-4 md:pl-6"
              >
                <Link href={`/collections?category=${category.slug}`}>
                  <div className="category-card relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="category-overlay absolute inset-0 flex flex-col items-center justify-end pb-5 md:pb-8">
                      <h3 className="text-white font-serif text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-bold mb-0.5 md:mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-[0.625rem] md:text-[0.75rem]">
                        {category.productCount} Product
                      </p>
                    </div>
                  </div>
                </Link>
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
