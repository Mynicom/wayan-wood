"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/SiteButton";

interface CTAProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string; href: string };
  };
}

export default function CTA({ data }: CTAProps) {
  const titleLines = data.title.split("\n");

  return (
    <section className="py-20 bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[480px] flex items-center">
            <div className="absolute inset-0">
              <Image
                src={data.image}
                alt="Wayan Wood Work workshop"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B2A1F]/90 via-[#3B2A1F]/75 to-[#3B2A1F]/60" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89B5B]/10 rounded-bl-[100px]" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C89B5B]/10 rounded-tr-[80px]" />

            <div className="relative z-10 px-8 py-14 md:px-16 md:py-20 max-w-2xl">
              <FadeIn delay={200}>
                <p className="text-[#C89B5B] text-[0.75rem] md:text-[0.875rem] tracking-[0.2em] uppercase font-medium mb-4">
                  {data.subtitle}
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <h2 className="font-serif text-white text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-bold leading-[1.15] mb-5">
                  {titleLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < titleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </FadeIn>

              <FadeIn delay={400}>
                <p className="text-white/70 text-[0.9375rem] md:text-[1.0625rem] mb-8 max-w-md leading-relaxed">
                  {data.description}
                </p>
              </FadeIn>

              <FadeIn delay={500}>
                <div className="flex flex-wrap gap-4">
                  <Button label={data.primaryButton.label} href={data.primaryButton.href} variant="primary" />
                  <Button label={data.secondaryButton.label} href={data.secondaryButton.href} variant="outline-light" />
                </div>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
