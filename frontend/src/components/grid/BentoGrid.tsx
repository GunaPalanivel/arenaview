import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface BentoItem {
  id: string;
  span?: "sm" | "md" | "lg"; // Grid span size
  children: ReactNode;
  className?: string;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
  variant?: "default" | "featured"; // featured for hero + cards layout
}

/**
 * Responsive Bento Grid Layout Component
 * Creates a masonry-like grid with configurable item spans
 *
 * Features:
 * - Responsive columns: 1 mobile, 2 tablet, 3-4 desktop
 * - Support for different span sizes (sm, md, lg)
 * - Featured variant for hero sections
 * - Glassmorphism and gradient support
 */
export const BentoGrid = ({
  items,
  className,
  variant = "default",
}: BentoGridProps) => {
  const gridClasses = cn(
    "grid gap-6 w-full",
    variant === "featured"
      ? // Featured layout: 1 large item + 2 cols of smaller items
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] sm:auto-rows-[280px]"
      : // Default: responsive columns
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max",
    className
  );

  const getSpanClasses = (_itemSpan?: "sm" | "md" | "lg") => {
    if (variant === "featured") {
      return {
        lg: "sm:col-span-2 sm:row-span-2",
        md: "col-span-1 row-span-1",
        sm: "col-span-1 row-span-1",
      };
    }
    return {
      lg: "lg:col-span-2",
      md: "col-span-1",
      sm: "col-span-1",
    };
  };

  return (
    <div className={gridClasses}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "transition-all duration-300 overflow-hidden",
            getSpanClasses(item.span)[item.span || "sm"],
            item.className
          )}
        >
          {item.children}
        </div>
      ))}
    </div>
  );
};

/**
 * BentoGrid responsive wrapper helper
 */
export const BentoGridContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
};
