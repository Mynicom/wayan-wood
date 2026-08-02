"use client";

import FadeIn from "@/components/ui/FadeIn";
import { TreePine, Hammer, Sparkles, Truck } from "lucide-react";

interface WhyChooseProps {
  data: {
    title: string;
    subtitle: string;
    cards: { icon: string; title: string; description: string }[];
  };
}

const iconMap: Record<string, React.ReactNode> = {
  "tree-pine": <TreePine className="w-6 h-6" />,
  hammer: <Hammer className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  truck: <Truck className="w-6 h-6" />,
};

export default function WhyChoose({ data }: WhyChooseProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-serif text-[#1B1B1B] text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-bold mb-4">
              {data.title}
            </h2>
            <p className="text-[#666666] text-[0.9375rem] md:text-[1.0625rem] max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.cards.map((card, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-[#F8F6F2] rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[#C89B5B]/10 flex items-center justify-center text-[#C89B5B] mx-auto mb-5">
                  {iconMap[card.icon]}
                </div>
                <h3 className="font-semibold text-[#1B1B1B] text-[1rem] mb-3">{card.title}</h3>
                <p className="text-[#666666] text-[0.875rem] leading-relaxed">{card.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
