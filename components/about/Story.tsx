"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { Check } from "lucide-react";

interface StoryProps {
  data: {
    title: string;
    description: string;
    highlights: { icon: string; text: string }[];
    image: string;
  };
}

export default function Story({ data }: StoryProps) {
  const paragraphs = data.description.split("\n\n");

  return (
    <section className="py-20 bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={data.image}
                alt="Wayan Wood Work story"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={200}>
            <h2 className="font-serif text-[#1B1B1B] text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-bold leading-tight mb-6">
              {data.title}
            </h2>

            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-[#666666] text-[0.9375rem] leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 space-y-4">
              {data.highlights.map((item, i) => (
                <FadeIn key={i} delay={300 + i * 100}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#C89B5B]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#C89B5B]" />
                    </div>
                    <span className="text-[#3B2A1F] text-[0.9375rem] font-medium">
                      {item.text}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
