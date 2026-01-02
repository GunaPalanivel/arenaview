import { X } from "lucide-react";
import { cn } from "../../utils/cn";

interface FilterPillProps {
  label: string;
  value: string;
  onRemove: () => void;
  variant?: "primary" | "secondary" | "accent";
}

/**
 * Removable filter pill component used in FilterBar
 */
export const FilterPill = ({
  label,
  onRemove,
  variant = "primary",
}: FilterPillProps) => {
  const variantClasses = {
    primary: "badge-primary hover:bg-cyan-200",
    secondary: "badge-glass hover:bg-white/20",
    accent:
      "bg-gradient-to-r from-violet-100 to-pink-100 text-violet-800 hover:from-violet-200 hover:to-pink-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium",
        "transition-all duration-200 animate-scale-in",
        variantClasses[variant]
      )}
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="p-0 hover:opacity-70 transition-opacity"
        aria-label={`Remove ${label} filter`}
      >
        <X size={14} />
      </button>
    </div>
  );
};
