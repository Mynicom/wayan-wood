"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function ContentModal({ isOpen, onClose, title, content }: ContentModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const paragraphs = content.split("\n\n");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl animate-[scaleIn_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-[#E7E3DD] px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-serif text-[#1B1B1B] text-[1.25rem] md:text-[1.5rem] font-bold pr-8">{title}</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#666666] hover:bg-[#E7E3DD] hover:text-[#1B1B1B] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          {paragraphs.map((paragraph, i) => {
            const isHeading = paragraph.match(/^(Q:|###|\d\.)/);
            return (
              <p
                key={i}
                className={`text-[#666666] text-[0.9375rem] leading-relaxed mb-4 last:mb-0 ${
                  isHeading ? "font-medium text-[#3B2A1F]" : ""
                }`}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
