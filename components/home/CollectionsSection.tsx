import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";

interface CollectionsSectionProps {
  products: Product[];
}

export default function CollectionsSection({ products }: CollectionsSectionProps) {
  return (
    <section id="collections" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[#3B2A1F] text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] font-bold">
              Our Collections
            </h2>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-[#3B2A1F] border border-[#3B2A1F] rounded-full px-3 py-2 md:px-6 md:py-3 text-[0.75rem] md:text-[0.875rem] font-semibold hover:bg-[#3B2A1F] hover:text-white transition-all duration-300"
            >
              View All Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="h-px bg-[#E7E3DD] mt-4" />
        </div>

        {/* Grid produk: 2 kolom mobile, 4 kolom desktop, gap-3 (12px) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
