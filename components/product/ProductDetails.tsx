import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  if (!product.description) return null;

  const lines = product.description.split("\n").filter((line) => line.trim() !== "");

  return (
    <section className="py-0">
      <h2 className="font-serif text-[#1B1B1B] text-[1.25rem] md:text-[1.375rem] font-bold mb-3">
        Product Details
      </h2>
      <div className="space-y-2 text-[0.9375rem] text-[#3B2A1F] leading-relaxed">
        {lines.map((line, index) => {
          const trimmed = line.trim();
          const isBullet = trimmed.startsWith("- ");
          const hasEmoji = /^[\u{1F300}-\u{1FAFF}]/u.test(trimmed);
          const isBold = trimmed.startsWith("Pre-Order") || trimmed.startsWith("Minimal Order") || trimmed.startsWith("Bikin") || trimmed.startsWith("DM");

          if (isBullet) {
            return (
              <p key={index} className="flex items-start gap-2">
                <span className="text-[#C89B5B] mt-0.5">•</span>
                <span>{trimmed.substring(2)}</span>
              </p>
            );
          }

          if (hasEmoji || isBold) {
            return (
              <p key={index} className="font-medium">
                {trimmed}
              </p>
            );
          }

          return (
            <p key={index}>
              {trimmed}
            </p>
          );
        })}
      </div>
    </section>
  );
}
