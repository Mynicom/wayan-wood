"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "@/data/categories";
import { materials } from "@/data/materials";

interface FilterSidebarProps {
  activeCategory: string | null;
  activeMaterials: string[];
  onCategoryChange: (slug: string | null) => void;
  onMaterialToggle: (material: string) => void;
  onFilter: () => void;
}

export default function FilterSidebar({
  activeCategory,
  activeMaterials,
  onCategoryChange,
  onMaterialToggle,
  onFilter,
}: FilterSidebarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name;
  const activeMaterialLabel = activeMaterials.length > 0 ? activeMaterials.join(", ") : "";

  return (
    <aside className="w-full lg:w-[270px] lg:flex-shrink-0">
      <div className="lg:sticky lg:top-[100px]">
        {/* Categories - Mobile Dropdown */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E7E3DD] rounded-lg text-[0.9375rem]"
          >
            <span className={!activeCategory ? "text-[#666666]" : "text-[#1B1B1B] font-medium"}>
              {activeCategoryName || "All Products"}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#666666] transition-transform duration-200 ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isCategoryOpen && (
            <div className="mt-2 bg-white border border-[#E7E3DD] rounded-lg overflow-hidden">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => {
                      onCategoryChange(null);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[0.9375rem] transition-colors ${
                      activeCategory === null
                        ? "text-[#C89B5B] font-semibold bg-[#C89B5B]/5"
                        : "text-[#1B1B1B] hover:bg-[#F8F6F2]"
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        onCategoryChange(activeCategory === cat.slug ? null : cat.slug);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[0.9375rem] transition-colors ${
                        activeCategory === cat.slug
                          ? "text-[#C89B5B] font-semibold bg-[#C89B5B]/5"
                          : "text-[#1B1B1B] hover:bg-[#F8F6F2]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Categories - Desktop Always Visible */}
        <div className="hidden lg:block">
          <h3 className="font-serif text-[#3B2A1F] text-[1.25rem] font-bold">Categories</h3>
          <div className="h-px bg-[#E7E3DD] mt-3 mb-4" />
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onCategoryChange(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[0.9375rem] transition-all duration-200 ${
                  activeCategory === null
                    ? "text-[#C89B5B] font-semibold bg-[#C89B5B]/5"
                    : "text-[#1B1B1B] hover:text-[#C89B5B] hover:bg-[#F8F6F2]"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() =>
                    onCategoryChange(activeCategory === cat.slug ? null : cat.slug)
                  }
                  className={`w-full text-left px-3 py-2 rounded-lg text-[0.9375rem] transition-all duration-200 ${
                    activeCategory === cat.slug
                      ? "text-[#C89B5B] font-semibold bg-[#C89B5B]/5"
                      : "text-[#1B1B1B] hover:text-[#C89B5B] hover:bg-[#F8F6F2]"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Material - Mobile Dropdown */}
        <div className="lg:hidden mt-8">
          <button
            onClick={() => setIsMaterialOpen(!isMaterialOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E7E3DD] rounded-lg text-[0.9375rem]"
          >
            <span className={!activeMaterials.length ? "text-[#666666]" : "text-[#1B1B1B] font-medium"}>
              {activeMaterialLabel || "Material"}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-[#666666] transition-transform duration-200 ${
                isMaterialOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isMaterialOpen && (
            <div className="mt-2 bg-white border border-[#E7E3DD] rounded-lg overflow-hidden">
              <ul className="py-1">
                {materials.map((mat) => (
                  <li key={mat}>
                    <label className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-[#F8F6F2] transition-colors">
                      <input
                        type="checkbox"
                        checked={activeMaterials.includes(mat)}
                        onChange={() => onMaterialToggle(mat)}
                        className="w-4 h-4 rounded border-[#E7E3DD] text-[#C89B5B] focus:ring-[#C89B5B] accent-[#C89B5B] cursor-pointer"
                      />
                      <span className="text-[0.9375rem] text-[#1B1B1B]">{mat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Material - Desktop Always Visible */}
        <div className="hidden lg:block mt-8">
          <h3 className="font-serif text-[#3B2A1F] text-[1.25rem] font-bold">Material</h3>
          <div className="h-px bg-[#E7E3DD] mt-3 mb-4" />
          <ul className="space-y-1">
            {materials.map((mat) => (
              <li key={mat}>
                <label className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#F8F6F2] transition-colors">
                  <input
                    type="checkbox"
                    checked={activeMaterials.includes(mat)}
                    onChange={() => onMaterialToggle(mat)}
                    className="w-4 h-4 rounded border-[#E7E3DD] text-[#C89B5B] focus:ring-[#C89B5B] accent-[#C89B5B] cursor-pointer"
                  />
                  <span className="text-[0.9375rem] text-[#1B1B1B]">{mat}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter Button */}
        <button
          onClick={onFilter}
          className="w-full mt-6 bg-[#1B1B1B] text-white text-[0.9375rem] font-semibold py-3 rounded-lg hover:bg-[#3B2A1F] transition-colors cursor-pointer"
        >
          Filter
        </button>
      </div>
    </aside>
  );
}
