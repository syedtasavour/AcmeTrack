import React from "react";
import Scale from "../../src/assets/media/scale.svg?react"; // Weight icon
import Pills from "../../src/assets/media/pill.svg?react"; // Medications icon
import Check from "../../src/assets/media/check.svg?react"; // Check icon

function TodaySummary({ summary }) {
  return (
    <div className="w-[606px] h-72 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6">
      <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
        Today's Summary
      </h2>
      <p className="text-zinc-900 text-sm font-normal font-['Inter'] mb-6">
        Overview of your entries for today.
      </p>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img src={Scale} alt="" />
          <span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              Weight:{" "}
            </span>
            <span className="text-zinc-900 text-sm font-medium font-['Inter']">
              {summary.weight}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img src={Pills} alt="" />
          <span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              Medications:{" "}
            </span>
            <span className="text-zinc-900 text-sm font-medium font-['Inter']">
              {summary.medications}
            </span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              {" "}
              taken
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img src={Check} alt="" />
          <span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              Check:{" "}
            </span>
            <span className="text-zinc-900 text-sm font-medium font-['Inter']">
              {summary.check}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodaySummary;
