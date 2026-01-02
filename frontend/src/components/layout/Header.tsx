import { useNavigate } from "react-router-dom";
import { Heart, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20 backdrop-blur-xl">
      <div className="container-page flex items-center justify-between py-4">
        {/* Logo/Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-gradient-primary">
            ArenaView
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate("/")}
            className="text-slate-700 hover:text-cyan-600 font-medium transition-colors"
          >
            Games
          </button>
          <button
            onClick={() => navigate("/favorites")}
            className="flex items-center gap-2 text-slate-700 hover:text-violet-600 font-medium transition-colors"
          >
            <Heart size={18} />
            Favorites
          </button>
        </nav>

        {/* User Info & Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-slate-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 glass-dark backdrop-blur-xl animate-slide-down">
          <div className="container-page py-4 space-y-4">
            <button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg font-medium transition-colors"
            >
              Games
            </button>
            <button
              onClick={() => {
                navigate("/favorites");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Heart size={18} />
              Favorites
            </button>
            {user && (
              <>
                <div className="px-4 py-2 text-sm text-slate-600">
                  {user.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
