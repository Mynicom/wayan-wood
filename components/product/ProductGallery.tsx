"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThumbnailClick = (index: number) => {
    if (index === selectedIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#E7E3DD]">
        <Image
          src={images[selectedIndex]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className={`object-cover transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
          priority


        />
      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="flex gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square w-[80px] md:w-[90px] overflow-hidden rounded-lg bg-[#E7E3DD] transition-all duration-200 ${
                selectedIndex === index
                  ? "ring-2 ring-[#C89B5B] ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} - Gambar ${index + 1}`}
                fill
                sizes="90px"
                className="object-cover"
                draggable={false}


              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
