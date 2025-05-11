import React from "react";

const InfoCard = ({
  title,
  description,
  iconUrl,
  imageUrl,
  outlineColor = "outline-zinc-300",
  label = "Nascetur mo.",
}) => {
  return (
    <div className="w-96 h-96 relative bg-zinc-200 rounded-[5px]">
      <div
        className={`w-96 h-48 left-0 top-[171px] absolute bg-white rounded-3xl outline outline-1 outline-offset-[-1px] ${outlineColor}`}
      >
        <div className="w-72 h-12 left-[26px] top-[111px] absolute text-neutral-500 text-base font-normal font-['Fredoka'] leading-relaxed">
          {description}
        </div>
        <div className="w-44 h-16 left-[26px] top-[40px] absolute text-neutral-600 text-xl font-medium font-['Fredoka'] leading-loose">
          {title}
        </div>
      </div>
      <img
        className="w-56 h-32 left-[66px] top-[39px] absolute"
        src={imageUrl}
        alt="Main visual"
      />
      <img
        className="w-10 h-9 left-[297px] top-[164px] absolute"
        src={iconUrl}
        alt="Icon"
      />
      <div className="w-10 h-2.5 left-[109px] top-[163px] absolute text-center text-blue-300 text-[4px] font-normal font-['Fredoka'] leading-[4.80px]">
        {label}
      </div>
    </div>
  );
};

export default InfoCard;
