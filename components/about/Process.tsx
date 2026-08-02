"use client";

import FadeIn from "@/components/ui/FadeIn";
import { Layers, Pencil, Hammer, CheckCircle, Package } from "lucide-react";

interface ProcessProps {
  data: {
    title: string;
    steps: { number: number; title: string; description: string; icon: string }[];
  };
}

const iconMap: Record<string, React.ReactNode> = {
  layers: <Layers className="w-5 h-5" />,
  pencil: <Pencil className="w-5 h-5" />,
  hammer: <Hammer className="w-5 h-5" />,
  "check-circle": <CheckCircle className="w-5 h-5" />,
  package: <Package className="w-5 h-5" />,
};

export default function Process({ data }: ProcessProps) {
  return (
    <section className="py-20 bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-serif text-[#1B1B1B] text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-bold">
              {data.title}
            </h2>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-[#E7E3DD]" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-6">
            {data.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#C89B5B] text-white flex items-center justify-center z-10 mb-4">
                    {iconMap[step.icon]}
                  </div>
                  <p className="text-[#C89B5B] text-[0.75rem] font-bold mb-1 h-4">
                    STEP {step.number}
                  </p>
                  <h3 className="font-semibold text-[#1B1B1B] text-[0.9375rem] mb-1 min-h-[1.75rem] flex items-center justify-center">
                    {step.title}
                  </h3>
                  <p className="text-[#666666] text-[0.8125rem] min-h-[2.5rem] flex items-start justify-center">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
