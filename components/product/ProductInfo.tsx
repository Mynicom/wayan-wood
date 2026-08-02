"use client";

import { Product } from "@/types/product";
import ProductDetails from "@/components/product/ProductDetails";
import AboutProduct from "@/components/product/AboutProduct";
import { useCart } from "@/components/cart/CartProvider";

interface ProductInfoProps {
  product: Product;
}

const WHATSAPP_NUMBER = "6281338246791";

export default function ProductInfo({ product }: ProductInfoProps) {
  const categoryName = product.category.split(",")[0]?.trim() || "";
  const materialName = product.material || product.category.split(",")[1]?.trim() || "";
  const { addItem } = useCart();

  const handleOrder = () => {
    const message = `Halo, saya tertarik dengan produk:\n\n${product.title}\n\nHarga: ${product.price}\nMaterial: ${materialName}\n\nMohon informasi lebih lanjut.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="flex flex-col">
      {/* Product Title */}
      <h1 className="font-serif text-[#1B1B1B] text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold leading-tight">
        {product.title}
      </h1>

      {/* Category & Material */}
      <p className="text-[0.875rem] text-[#666666] mt-1">
        {categoryName}
        {materialName && `, ${materialName}`}
      </p>

      {/* Price */}
      <p className="font-serif text-[#1B1B1B] text-[1.5rem] md:text-[1.75rem] font-bold mt-2">
        {product.price}
      </p>

      {/* Note */}
      <p className="text-[0.8125rem] text-[#666666] italic mt-1">
        *all Price do not Include Cushion
      </p>

      {/* Order Button */}
      <button
        onClick={handleOrder}
        className="w-full bg-[#1B1B1B] text-white font-semibold text-[0.875rem] md:text-[1rem] py-4 px-8 rounded-lg hover:bg-[#3B2A1F] transition-colors duration-300 cursor-pointer mt-4"
      >
        ORDER NOW +
      </button>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-[#C89B5B] text-black font-semibold text-[0.875rem] md:text-[1rem] py-4 px-8 rounded-lg hover:bg-[#B08A4A] transition-colors duration-300 cursor-pointer mt-3"
      >
        ADD TO CART +
      </button>

      {/* Divider */}
      <div className="h-px bg-[#E7E3DD] my-5" />

      {/* Product Details */}
      <ProductDetails product={product} />

      {/* Divider */}
      <div className="h-px bg-[#E7E3DD] my-5" />

      {/* About Product */}
      <AboutProduct product={product} />
    </div>
  );
}
