"use client";

interface CarouselDotsProps {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
  color?: "white" | "dark";
}

export default function CarouselDots({
  total,
  activeIndex,
  onDotClick,
  color = "dark",
}: CarouselDotsProps) {
  const activeBg = color === "white" ? "bg-white" : "bg-[#3B2A1F]";
  const inactiveBg = color === "white" ? "bg-white/30" : "bg-[#3B2A1F]/20";

  return (
    <div
      className="flex items-center justify-center gap-3 mt-8"
      role="tablist"
      aria-label="Carousel navigation"
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Go to slide ${index + 1}`}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            index === activeIndex ? `${activeBg} scale-125` : inactiveBg
          }`}
        />
      ))}
    </div>
  );
}
