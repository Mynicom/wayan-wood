import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function SectionHeader({ title, actionLabel, actionHref }: SectionHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[#3B2A1F] text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] font-bold">
          {title}
        </h2>
        {actionLabel && actionHref && (
          <a
            href={actionHref}
            className="inline-flex items-center gap-2 text-[#3B2A1F] border border-[#3B2A1F] rounded-full px-3 py-2 md:px-6 md:py-3 text-[0.75rem] md:text-[0.875rem] font-semibold hover:bg-[#3B2A1F] hover:text-white transition-all duration-300"
          >
            {actionLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
      <div className="h-px bg-[#E7E3DD] mt-4 mb-8" />
    </div>
  );
}
