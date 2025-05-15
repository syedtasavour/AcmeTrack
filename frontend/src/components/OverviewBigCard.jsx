import React from "react";

export default function OverviewBigCard({
  label = "Label",
  value = "Value",
  type = "Type",
  description = "Description",
  icon = null,
}) {
  const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

  // Determine left position for 'type'
  let typeLeft;
  if (type === "Kg") {
    typeLeft = "166px";
  } else if (isNumeric) {
    typeLeft = "110px";
  } else {
    typeLeft = "140px";
  }

  return (
    <div>
      <div className="w-96 h-44 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400">
        {/* Icon Container */}
        <div className="w-6 h-6 left-[25px] top-[43px] absolute overflow-hidden">
          <img src={icon} alt="" />
        </div>
        <div className="left-[65px] top-[26px] absolute justify-start text-zinc-900 text-sm font-normal font-['Inter'] leading-tight">
          {label}
        </div>
        <div className="left-[65px] top-[43px] absolute justify-start text-zinc-900 text-4xl font-bold font-['Inter'] leading-10">
          {value}
        </div>
        <div
          style={{ left: typeLeft }}
          className="top-[59px] absolute justify-start text-zinc-900 text-xl font-normal font-['Inter'] leading-7"
        >
          {type}
        </div>
        <div className="left-[25px] top-[101px] absolute justify-start text-zinc-900 text-xs font-normal font-['Inter'] leading-none">
          {description}
        </div>
      </div>
    </div>
  );
}
