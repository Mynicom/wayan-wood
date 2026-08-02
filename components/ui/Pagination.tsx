"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#C89B5B] transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-[#1B1B1B]" />
      </button>
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-[#666666] text-[0.875rem]">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-[0.875rem] font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-[#1B1B1B] text-white"
                : "text-[#1B1B1B] hover:bg-[#E7E3DD]"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#C89B5B] transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-[#1B1B1B]" />
      </button>
    </div>
  );
}
