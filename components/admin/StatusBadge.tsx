import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  label: string;
  variant?: "success" | "warning" | "danger" | "default";
}

const variantStyles = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  default: "bg-gray-50 text-gray-700 border-gray-200",
};

export default function StatusBadge({ label, variant = "default" }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={variantStyles[variant]}>
      {label}
    </Badge>
  );
}
