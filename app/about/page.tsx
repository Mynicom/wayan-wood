import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutPage from "@/components/about/AboutPage";
import { findManyProducts } from "@/lib/services/products";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Wayan Wood Work, our story, craftsmanship, premium wood furniture, and commitment to quality.",
};

async function getProducts() {
  const products = await findManyProducts({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return products.map((product: any) => ({
    id: product.id,
    title: product.name,
    slug: product.slug,
    category: product.category?.name || "",
    image: product.thumbnail,
  }));
}

export default async function About() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
        <AboutPage products={products} />
      </main>
      <Footer />
    </>
  );
}
