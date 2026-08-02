"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

interface ShowroomProduct {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
}

interface ShowroomProps {
  data: {
    title: string;
    description: string;
  };
  products: ShowroomProduct[];
}

const BLUR_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRTdFM0JEIi8+PC9zdmc+";

function Card({
  product,
  className,
  delay,
}: {
  product: ShowroomProduct;
  className?: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay} className={className}>
      <Link
        href={product.slug ? `/product/${product.slug}` : "#"}
        className="block h-full"
      >
        <div className="relative overflow-hidden rounded-[20px] shadow-sm hover:shadow-lg group w-full h-full">
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL={BLUR_URL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <p className="text-white text-[0.875rem] sm:text-[1rem] font-semibold">
                  {product.title}
                </p>
                <p className="text-white/70 text-[0.75rem] sm:text-[0.8125rem] mt-0.5">
                  {product.category}
                </p>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-[#E7E3DD] min-h-[200px]" />
          )}
        </div>
      </Link>
    </FadeIn>
  );
}

export default function Showroom({ data, products }: ShowroomProps) {
  const images = Array.from({ length: 6 }, (_, i) => {
    if (products[i]) return products[i];
    return {
      id: -(i + 1),
      title: "",
      slug: "",
      category: "",
      image: "",
    };
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-serif text-[#1B1B1B] text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-bold mb-4">
              {data.title}
            </h2>
            <p className="text-[#666666] text-[0.9375rem] md:text-[1.0625rem] max-w-2xl mx-auto">
              {data.description}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {images.map((product, i) => (
            <Card key={product.id} product={product} delay={i * 80} className="aspect-[4/3]" />
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-12">
            <Link
              href="/collections?bestSeller=true"
              className="inline-flex items-center gap-2 bg-[#C89B5B] text-black font-semibold text-[0.875rem] md:text-[1rem] py-3 px-8 rounded-full hover:bg-[#B08A4A] hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Lihat Produk Terbaik
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
