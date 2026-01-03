import type React from "react";

interface HeroSectionProps {
  gamesCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ gamesCount }) => {
  return (
    <section className="container-page pb-0 pt-8 sm:pt-12">
      <div className="space-y-4 mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-gradient-primary">
            Game Arena
          </h1>
          <p className="text-lg text-slate-600">
            Discover{" "}
            <span className="font-semibold text-slate-900">premium gaming</span>{" "}
            experiences with our curated collection of sports and casino games.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-4 py-4">
          <div className="card-base backdrop-blur-xl">
            <div className="text-2xl font-bold text-cyan-600">
              {gamesCount}+
            </div>
            <p className="text-sm text-slate-600">Games Available</p>
          </div>
          <div className="card-base backdrop-blur-xl">
            <div className="text-2xl font-bold text-violet-600">24/7</div>
            <p className="text-sm text-slate-600">Live Streaming</p>
          </div>
          <div className="card-base backdrop-blur-xl">
            <div className="text-2xl font-bold text-emerald-600">100K+</div>
            <p className="text-sm text-slate-600">Active Players</p>
          </div>
        </div>
      </div>
    </section>
  );
};
