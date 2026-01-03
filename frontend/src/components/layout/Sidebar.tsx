import { Home, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen = true }: SidebarProps) => {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { label: "Home", icon: <Home size={20} />, href: "/" },
    {
      label: "Favorites",
      icon: <Heart size={20} />,
      href: "/favorites",
      badge: 0,
    },
  ];

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col w-64 h-screen glass border-r border-white/20 backdrop-blur-xl",
        "fixed left-0 top-0 pt-20 px-4 py-6 space-y-2 overflow-y-auto",
        "transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => navigate(item.href)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
              "text-slate-700 hover:bg-white/10 hover:text-cyan-600",
              "transition-all duration-200 font-medium group"
            )}
          >
            <span className="group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge ? (
              <span className="badge-glass text-xs">{item.badge}</span>
            ) : null}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-6 border-t border-white/20">
        <div className="card-base text-center">
          <p className="text-xs text-slate-600 mb-2">ArenaView v1.0</p>
          <p className="text-xs text-slate-500">Premium gaming experience</p>
        </div>
      </div>
    </aside>
  );
};
