import type React from "react";

interface LoadingGameSkeletonProps {
  count?: number;
}

export const LoadingGameSkeleton: React.FC<LoadingGameSkeletonProps> = ({
  count = 12,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="card-base h-80 animate-pulse" />
      ))}
    </div>
  );
};
