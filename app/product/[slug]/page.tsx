import { Suspense } from "react";
import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import { findUniqueProduct, findManyProducts } from "@/lib/services/products";

type Props = {
  params: Promise<{ slug: string }>;
};

const getProductBySlug = cache(async (slug: string) => {
  const product = await findUniqueProduct({ slug });

  if (!product) return null;

  return {
    id: product.id,
    title: product.name,
    slug: product.slug,
    category: `${product.category?.name || ""}, ${product.material || ""}`,
    material: product.material,
    price: `Rp. ${Number(product.price).toLocaleString("id-ID")}`,
    image: product.thumbnail,
    images: (product.images || []).map((img: any) => img.image),
    shortDescription: product.shortDescription,
    description: product.productDescription,
    finishing: product.finishing,
    dimensions: product.dimensions
      ? {
          width: product.dimensions.width,
          height: product.dimensions.height,
          length: product.dimensions.length,
          weight: product.dimensions.weight,
        }
      : undefined,
    stock: product.stock,
    minimumOrder: product.minimumOrder,
    leadTime: product.leadTime,
  };
});

async function getRelatedProducts(categoryName: string, materialName: string, maxCount = 8) {
  const allProducts = await findManyProducts({
    where: { isActive: true },
    include: { category: true },
    orderBy: { views: "desc" },
  });

  return allProducts
    .filter((p: any) => p.category?.name === categoryName && p.material !== materialName)
    .slice(0, maxCount)
    .map((p: any) => ({
      id: p.id,
      title: p.name,
      slug: p.slug,
      category: `${p.category?.name || ""}, ${p.material || ""}`,
      price: `Rp. ${p.price.toLocaleString("id-ID")}`,
      image: p.thumbnail,
      material: p.material,
      isBestSeller: p.isBestSeller,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const categoryName = product.category.split(",")[0]?.trim() || "";

  return {
    title: product.title,
    description: product.shortDescription || product.description?.substring(0, 160) || `${product.title} - ${categoryName}`,
    openGraph: {
      title: `${product.title} | Wayan Wood Work`,
      description: product.shortDescription || product.description?.substring(0, 160) || "",
      images: [{ url: product.image, width: 800, height: 1000, alt: product.title }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const categoryName = product.category.split(",")[0]?.trim() || "";
  const relatedProducts = await getRelatedProducts(categoryName, product.material);
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <Navbar />
      <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <nav className="py-5">
            <p className="text-[0.875rem] text-[#666666]">
              <Link href="/" className="hover:text-[#C89B5B] transition-colors">Collections</Link>
              <span className="mx-1">/</span>
              <Link href="/collections" className="hover:text-[#C89B5B] transition-colors">{categoryName}</Link>
              <span className="mx-1">/</span>
              <span className="text-[#1B1B1B]">{product.title}</span>
            </p>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-12">
            <div className="w-full lg:w-[45%]">
              <ProductGallery images={galleryImages} alt={product.title} />
            </div>
            <div className="w-full lg:w-[55%]">
              <ProductInfo product={product} />
            </div>
          </div>

          <div className="border-t border-[#E7E3DD]" />
        </div>

        <Suspense fallback={null}>
          <RelatedProducts products={relatedProducts} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
