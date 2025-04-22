import React from "react";

export default function Clock({ deg=90 }) {
  return (
    <div className="h-44 overflow-hidden relative">
      <div className="w-96 h-48 border-4 border-[#b372fd] border-b-transparent rounded-t-full bg-transparent"></div>
        {/* clock hand */}
        <div className="absolute w-2/5 h-0.5 bg-[#b372fd] bottom-0 right-1/2  origin-right rounded-2xl duration-300" style={{ transform: `rotate(${deg}deg)` }}></div>
    </div>
  );
}
