import { Home, Heart, Settings, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const MobileNav = () => {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "Home", icon: <Home size={24} />, href: "/" },
    { label: "Favorites", icon: <Heart size={24} />, href: "/favorites" },
    { label: "Settings", icon: <Settings size={24} />, href: "/settings" },
    { label: "About", icon: <Info size={24} />, href: "/about" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/20 backdrop-blur-xl">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => navigate(item.href)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-lg",
              "text-slate-600 hover:text-cyan-600 hover:bg-white/10",
              "transition-all duration-200"
            )}
            title={item.label}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
