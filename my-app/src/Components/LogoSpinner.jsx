import React from "react";

const LogoSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative flex flex-col items-center justify-center">
        {/* Glowing ring background */}
        <div className="absolute w-60 h-60 rounded-full border-4 border-blue-900/20 animate-pulse-slow"></div>
        <div className="absolute w-72 h-72 rounded-full border-t-4 border-b-4 border-red-600/30 animate-spin-slow"></div>

        {/* Large spinning logo */}
        <img
          src="/Logo2.png"
          alt="Bereoth Logo"
          className="h-40 w-40 animate-rotate-scale drop-shadow-2xl relative z-10"
        />

        {/* Loading text */}
        <p className="mt-8 text-blue-900 text-xl font-semibold tracking-widest animate-fade">
          Loading Bereoth...
        </p>
      </div>
    </div>
  );
};

export default LogoSpinner;
