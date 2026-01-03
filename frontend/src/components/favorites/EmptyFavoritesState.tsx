import type React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmptyFavoritesState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <div className="container-page py-8 sm:py-12">
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-gradient-secondary">
          My Favorites
        </h1>
        <p className="text-lg text-slate-600 mt-2">
          Games you've marked as favorites
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="inline-block p-6 glass rounded-full">
            <Heart size={48} className="text-red-500 mx-auto" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              No Favorites Yet
            </h2>
            <p className="text-slate-600">
              Start exploring games and click the heart icon to add your
              favorites!
            </p>
          </div>
          <button
            onClick={() => navigate("/games")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Browse Games
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
