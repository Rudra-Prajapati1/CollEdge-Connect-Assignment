import React from "react";

const SkeletonCard = () => {
  return (
    <div className="border border-white/30 rounded-xl p-5 mb-4 animate-pulse">
      <div className="h-5 w-24 bg-white/20 rounded mb-3"></div>
      <div className="h-4 w-1/2 bg-white/20 rounded mb-2"></div>
      <div className="h-4 w-1/3 bg-white/20 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
