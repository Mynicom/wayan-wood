"use client";

import FadeIn from "@/components/ui/FadeIn";

interface Stat {
  value: string;
  suffix: string;
  label: string;
}

interface StatisticsProps {
  data: Stat[];
}

export default function Statistics({ data }: StatisticsProps) {
  return (
    <section className="py-20 bg-[#3B2A1F]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {data.map((stat, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="text-center">
                <p className="font-serif text-[#C89B5B] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-bold leading-none mb-2">
                  {stat.value}
                  <span className="text-[#C89B5B]/80">{stat.suffix}</span>
                </p>
                <p className="text-white/70 text-[0.875rem] md:text-[1rem]">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
