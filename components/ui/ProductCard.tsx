import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="product-card bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="relative overflow-hidden aspect-[3/4]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover product-image"
            draggable={false}


          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-[#1B1B1B] text-[0.875rem] md:text-[1rem] line-clamp-2">{product.title}</h3>
          <p className="text-[0.75rem] text-[#C89B5B] mt-1">{product.category}</p>
          <p className="font-bold text-[#1B1B1B] text-[0.875rem] md:text-[1rem] mt-2">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
