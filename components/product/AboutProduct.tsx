import { Product } from "@/types/product";

interface AboutProductProps {
  product: Product;
}

export default function AboutProduct({ product }: AboutProductProps) {
  const hasDimensions =
    product.dimensions &&
    (product.dimensions.width || product.dimensions.height || product.dimensions.length || product.dimensions.weight);

  const hasMaterial = !!product.material;
  const hasFinishing = !!product.finishing;

  if (!hasDimensions && !hasMaterial && !hasFinishing) return null;

  const formatDimension = () => {
    if (!product.dimensions) return null;
    const parts: string[] = [];
    if (product.dimensions.width) parts.push(`W ${product.dimensions.width}`);
    if (product.dimensions.length) parts.push(`D ${product.dimensions.length}`);
    if (product.dimensions.height) parts.push(`H ${product.dimensions.height}`);
    return parts.join(" × ");
  };

  const dimensionText = formatDimension();

  return (
    <section className="py-0">
      <h2 className="font-serif text-[#1B1B1B] text-[1.25rem] md:text-[1.375rem] font-bold mb-3">
        About Product
      </h2>

      <div className="space-y-3 text-[0.9375rem] text-[#3B2A1F]">
        {/* Dimensions */}
        {hasDimensions && dimensionText && (
          <div>
            <h3 className="font-bold mb-1">Dimension</h3>
            <p className="leading-relaxed">{dimensionText}</p>
          </div>
        )}

        {/* Material */}
        {hasMaterial && (
          <div>
            <h3 className="font-bold mb-1">Material</h3>
            <p>{product.material}</p>
          </div>
        )}

        {/* Finishing */}
        {hasFinishing && (
          <div>
            <h3 className="font-bold mb-1">Finishing</h3>
            <p>{product.finishing}</p>
          </div>
        )}
      </div>
    </section>
  );
}
