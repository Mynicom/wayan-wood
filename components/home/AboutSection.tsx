"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/SiteButton";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=1600&h=900&fit=crop"
                alt="Wood craftsman at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={200}>
            <p className="text-[#C89B5B] text-[0.875rem] md:text-[1rem] font-medium mb-3">About Us</p>
            <h2 className="font-serif text-[#1B1B1B] text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-bold leading-tight mb-5">
              Craftsmanship
              <br />
              You Can Trust
            </h2>
            <p className="text-[#666666] text-[0.875rem] md:text-[1rem] leading-relaxed mb-8">
              Hand-carved by skilled craftsmen, each piece carries its own
              distinct character. Our multi-stage smoothing process ensures a
              surface that is precisely crafted, comfortable, and flawlessly
              smooth to the touch.
            </p>
            <Button label="Learn More About Us" href="/about" variant="outline" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
