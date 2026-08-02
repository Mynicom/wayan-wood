import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionsContent from "@/components/collections/CollectionsContent";
import { findManyProducts } from "@/lib/services/products";
import { findManyCategoriesWithCount } from "@/lib/services/categories";
import { findDistinctMaterials } from "@/lib/services/products";

export const metadata = {
  title: "Our Collections",
  description: "Browse our handcrafted wooden furniture collections.",
};

async function getProducts() {
  const products = await findManyProducts({
    where: { isActive: true },
    include: {
      category: true,
      images: true,
      dimensions: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return products.map((product: any) => ({
    id: product.id,
    title: product.name,
    slug: product.slug,
    category: `${product.category?.name || ""}, ${product.material || ""}`,
    price: `Rp. ${Number(product.price).toLocaleString("id-ID")}`,
    image: product.thumbnail,
    images: (product.images || []).map((img: any) => img.image),
    shortDescription: product.shortDescription,
    description: product.productDescription,
    material: product.material,
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
    isBestSeller: product.isBestSeller,
  }));
}

async function getCategories() {
  const categories = await findManyCategoriesWithCount();
  return categories.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    productCount: cat.productCount,
    image: cat.image,
  }));
}

async function getMaterials() {
  return await findDistinctMaterials();
}

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; material?: string; search?: string }>;
}) {
  const [products, categories, materials] = await Promise.all([
    getProducts(),
    getCategories(),
    getMaterials(),
  ]);

  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
            <div className="max-w-[1280px] mx-auto px-5 md:px-10">
              <div className="py-6 h-6" />
              <div className="h-12 w-80 bg-[#E7E3DD] rounded mb-8" />
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pb-20">
                <aside className="w-full lg:w-[270px] lg:flex-shrink-0">
                  <div className="h-6 w-32 bg-[#E7E3DD] rounded mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 bg-[#E7E3DD] rounded" />
                    ))}
                  </div>
                </aside>
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                        <div className="aspect-[3/4] bg-[#E7E3DD]" />
                        <div className="p-3 space-y-2">
                          <div className="h-4 bg-[#E7E3DD] rounded w-3/4" />
                          <div className="h-3 bg-[#E7E3DD] rounded w-1/2" />
                          <div className="h-4 bg-[#E7E3DD] rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        }
      >
        <CollectionsContent
          searchParamsPromise={searchParams}
          initialProducts={products}
          initialCategories={categories}
          initialMaterials={materials}
        />
      </Suspense>
      <Footer />
    </>
  );
}
