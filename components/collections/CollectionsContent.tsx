"use client";

import { useState, useMemo, use, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import FilterSidebar from "@/components/collections/FilterSidebar";
import { Product } from "@/types/product";

const PRODUCTS_PER_PAGE = 6;

type SortOption = "default" | "newest" | "oldest" | "price-low" | "price-high" | "best-seller";

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Default", value: "default" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price Low to High", value: "price-low" },
  { label: "Price High to Low", value: "price-high" },
  { label: "Best Seller", value: "best-seller" },
];

function parseCategory(category: string): { categoryName: string; material: string } {
  const parts = category.split(",").map((p) => p.trim());
  return {
    categoryName: parts[0] || "",
    material: parts[1] || "",
  };
}

function extractPrice(price: string): number {
  const match = price.replace(/\./g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

interface CollectionsContentProps {
  searchParamsPromise: Promise<{ category?: string; material?: string; search?: string; bestSeller?: string }>;
  initialProducts: Product[];
  initialCategories: { id: number; name: string; slug: string; productCount: number; image: string }[];
  initialMaterials: string[];
}

export default function CollectionsContent({
  searchParamsPromise,
  initialProducts,
  initialCategories,
  initialMaterials,
}: CollectionsContentProps) {
  const searchParams = use(searchParamsPromise);
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.category ?? null
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    searchParams.material ? searchParams.material.split(",") : []
  );
  const urlSearchParams = useSearchParams();
  const searchQuery = urlSearchParams.get("search") ?? "";
  const [sortBy, setSortBy] = useState<SortOption>(
    searchParams.bestSeller === "true" ? "best-seller" : "default"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allProducts = useMemo(() => initialProducts, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.material?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => {
        const { categoryName } = parseCategory(p.category);
        return categoryName.toLowerCase().replace(/\s+/g, "-") === selectedCategory;
      });
    }

    if (selectedMaterials.length > 0) {
      result = result.filter((p) => {
        const { material } = parseCategory(p.category);
        return selectedMaterials.includes(material);
      });
    }

    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result = [...result].sort((a, b) => a.id - b.id);
        break;
      case "price-low":
        result = [...result].sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
        break;
      case "price-high":
        result = [...result].sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
        break;
      case "best-seller":
        result = [...result].sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return b.id - a.id;
        });
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, selectedCategory, selectedMaterials, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  function updateUrl(category: string | null, materials: string[]) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (materials.length > 0) params.set("material", materials.join(","));
    const qs = params.toString();
    router.push(`/collections${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  function handleCategoryChange(slug: string | null) {
    setSelectedCategory(slug);
    setCurrentPage(1);
    updateUrl(slug, selectedMaterials);
  }

  function handleMaterialToggle(material: string) {
    const next = selectedMaterials.includes(material)
      ? selectedMaterials.filter((m) => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(next);
    setCurrentPage(1);
    updateUrl(selectedCategory, next);
  }

  function handleFilter() {
    updateUrl(selectedCategory, selectedMaterials);
    setCurrentPage(1);
  }

  return (
    <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* Breadcrumb */}
        <nav className="py-6">
          <p className="text-[0.875rem] text-[#666666]">
            <Link href="/" className="hover:text-[#C89B5B] transition-colors">
              home
            </Link>
            <span className="mx-1">/</span>
            <span className="text-[#1B1B1B]">Collections</span>
          </p>
        </nav>

        {/* Title */}
        <h1 className="font-serif text-[#3B2A1F] text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold mb-2">
          {searchQuery ? "Search Results" : "Our Collections"}
        </h1>
        {searchQuery && (
          <p className="text-[0.9375rem] text-[#666666] mb-6">
            Showing results for &quot;{searchQuery}&quot;
          </p>
        )}

        {/* Content: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pb-20">
          {/* Sidebar */}
          <FilterSidebar
            activeCategory={selectedCategory}
            activeMaterials={selectedMaterials}
            onCategoryChange={handleCategoryChange}
            onMaterialToggle={handleMaterialToggle}
            onFilter={handleFilter}
          />

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Product count + Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[0.9375rem] text-[#1B1B1B] font-medium">
                {filteredProducts.length} Pcs
              </p>
              <div className="flex items-center gap-1">
                <span className="font-serif text-[0.9375rem] text-[#666666]">Sort by:</span>
                <div ref={sortRef} className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="inline-flex items-center gap-2 border border-[#E7E3DD] rounded-lg px-4 py-2 bg-white text-[0.9375rem] text-[#1B1B1B] hover:border-[#C89B5B] transition-colors duration-200 cursor-pointer"
                  >
                    {sortOptions.find((opt) => opt.value === sortBy)?.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isSortOpen && (
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-[#E7E3DD] rounded-xl shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setCurrentPage(1);
                            setIsSortOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-[0.875rem] transition-colors duration-150 cursor-pointer ${
                            sortBy === opt.value
                              ? "text-[#C89B5B] font-medium bg-[#C89B5B]/5"
                              : "text-[#1B1B1B] hover:bg-[#F8F6F2]"
                          }`}
                        >
                          {opt.label}
                          {sortBy === opt.value && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[1rem] text-[#666666]">No products found.</p>
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
