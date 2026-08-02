import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "outline-light";
}

export default function Button({ label, href, onClick, variant = "primary" }: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 cursor-pointer text-[0.8125rem] md:text-[0.875rem]";

  const variants = {
    primary:
      "bg-[#C89B5B] text-black rounded-full px-6 py-3 md:px-8 md:py-4 hover:bg-[#B08A4A] hover:-translate-y-0.5",
    outline:
      "text-[#3B2A1F] border border-[#3B2A1F] rounded-full px-6 py-3 md:px-8 md:py-4 hover:bg-[#3B2A1F] hover:text-white",
    "outline-light":
      "text-white border border-white rounded-full px-6 py-3 md:px-8 md:py-4 hover:bg-white hover:text-[#3B2A1F]",
  };

  const className = `${baseStyle} ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
