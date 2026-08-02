"use client";

import Button from "@/components/ui/SiteButton";

export default function HeroContent() {
  return (
    <div className="flex flex-col justify-center animate-[fadeSlideUp_0.6s_ease-out_both]">
      <p className="text-white text-[0.875rem] tracking-[0.2em] uppercase font-medium mb-4">
        WAYAN WOOD WORK
      </p>
      <h1 className="text-white font-serif font-bold leading-[1.1] mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.75rem]">
        Timeless Woodcraft
        <br />
        for Modern Living
      </h1>
      <p className="text-white/80 mb-8 text-[1.125rem] md:text-[1.25rem]">
        Timeless Woodcraft for Modern Living
      </p>
      <div>
        <Button label="View Collections" href="/collections" />
      </div>
    </div>
  );
}
