import React from "react";
import Heart from "../../src/assets/media/heart-pulse.svg?react"; // Import SVG as a React component

function OverviewCard({ label = "Label", value = "Value" }) {
  return (
    <div className="w-96 h-20 bg-white rounded-[10px] shadow-sm flex items-center px-4">
      {/* Icon Container */}
      <div className="w-6 h-6 mr-4 flex items-center justify-center">
        <img src={Heart} alt="heart" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center">
        <div className="text-xs text-zinc-900 font-normal leading-none">
          {label}
        </div>
        <div className="text-xl text-zinc-900 font-medium leading-7">
          {value}
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;
