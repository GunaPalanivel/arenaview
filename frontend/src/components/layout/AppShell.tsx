import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useBreakpoint } from "@/hooks/useMediaQuery";

interface AppShellProps {
  children: ReactNode;
}

/**
 * Main layout wrapper component
 * Provides Header, Sidebar (desktop), MobileNav (mobile), and container for pages
 */
export const AppShell = ({ children }: AppShellProps) => {
  const { isTabletOrSmaller } = useBreakpoint();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header - visible on all devices */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - desktop only */}
        {!isTabletOrSmaller && <Sidebar isOpen={true} />}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto lg:ml-64">
          <div className="pb-20 lg:pb-0">{children}</div>
        </main>
      </div>

      {/* Mobile Navigation - mobile only */}
      {isTabletOrSmaller && <MobileNav />}
    </div>
  );
};
