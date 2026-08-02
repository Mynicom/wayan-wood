import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import CollectionsSection from "@/components/home/CollectionsSection";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";
import { findManyProducts, countProducts } from "@/lib/services/products";
import { findManyCategoriesWithCount } from "@/lib/services/categories";

function mapProduct(p: any) {
  return {
    id: p.id,
    title: p.name,
    slug: p.slug,
    category: `${p.category?.name || ""}, ${p.material || ""}`,
    price: `Rp. ${Number(p.price).toLocaleString("id-ID")}`,
    image: p.thumbnail,
    shortDescription: p.shortDescription,
    material: p.material,
    isBestSeller: p.isBestSeller,
  };
}

async function getProducts() {
  const [allProducts, bestSellers] = await Promise.all([
    findManyProducts({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    findManyProducts({
      where: { isActive: true, isBestSeller: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  return {
    newArrivals: allProducts.slice(0, 5).map(mapProduct),
    collections: allProducts.map(mapProduct),
    bestSellers: bestSellers.map(mapProduct),
  };
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

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <Hero products={products.newArrivals} />
      <CategoriesSection categories={categories} />
      <BestSellersSection products={products.bestSellers} />
      <CollectionsSection products={products.collections} />
      <AboutSection />
      <Footer />
    </>
  );
}
