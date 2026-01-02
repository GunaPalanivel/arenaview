import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selected?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

/**
 * Animated dropdown for filter selection
 */
export const FilterDropdown = ({
  label,
  options,
  selected,
  onSelect,
  placeholder,
  icon,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-xs">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full glass px-4 py-3 rounded-lg flex items-center justify-between",
          "text-slate-900 font-medium transition-all duration-200",
          "hover:bg-white/20 hover:border-white/30",
          isOpen && "bg-white/20 border-white/30"
        )}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-700">{icon}</span>}
          <span>
            {selectedOption ? selectedOption.label : placeholder || label}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 glass rounded-lg",
            "shadow-glass z-10 animate-slide-down overflow-hidden"
          )}
        >
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 flex items-center justify-between",
                  "hover:bg-white/20 transition-colors duration-150",
                  "border-b border-white/10 last:border-0",
                  selected === option.value && "bg-cyan-100 text-cyan-900"
                )}
              >
                <span className="font-medium">{option.label}</span>
                {option.count && (
                  <span className="text-xs bg-slate-200/50 px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
