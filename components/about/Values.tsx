"use client";

import FadeIn from "@/components/ui/FadeIn";
import { Award, Lightbulb, Heart } from "lucide-react";

interface ValuesProps {
  data: {
    title: string;
    cards: { icon: string; title: string; description: string }[];
  };
}

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-7 h-7" />,
  lightbulb: <Lightbulb className="w-7 h-7" />,
  heart: <Heart className="w-7 h-7" />,
};

export default function Values({ data }: ValuesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-serif text-[#1B1B1B] text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-bold">
              {data.title}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.cards.map((card, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-[#F8F6F2] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#C89B5B]/10 flex items-center justify-center text-[#C89B5B] mb-6">
                  {iconMap[card.icon]}
                </div>
                <h3 className="font-serif text-[#1B1B1B] text-[1.25rem] font-bold mb-3">{card.title}</h3>
                <p className="text-[#666666] text-[0.9375rem] leading-relaxed">{card.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
