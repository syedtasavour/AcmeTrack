import Heart from "../../src/assets/media/heart-pulse.svg?react";

function RecentEntries({ entries }) {
  return (
    <div className="w-96 h-80 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6 overflow-auto">
      <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
        Recent Entries
      </h2>
      <p className="text-zinc-900 text-sm font-normal font-['Inter'] mb-4">
        Review your past health logs.
      </p>

      {entries.map((entry, index) => (
        <div key={index} className="mb-4">
          <div className="text-zinc-900 text-sm font-semibold font-['Archivo']">
            {entry.date}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <img
              src={Heart}
              alt="Weight icon"
              className="w-4 h-4 fill-zinc-900"
            />
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              {entry.weight}
            </span>
            <div className="w-1 h-1 rounded-full bg-zinc-400 mx-2" />
            <img
              src={Heart}
              alt="Medication icon"
              className="w-4 h-4 fill-zinc-900"
            />
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              {entry.medsTaken}
            </span>
          </div>
          <p className="text-zinc-900 text-sm font-normal font-['Inter'] mt-1 max-w-[90%]">
            {entry.note}
          </p>
          {index !== entries.length - 1 && (
            <hr className="border-t border-zinc-400 mt-4" />
          )}
        </div>
      ))}
    </div>
  );
}

export default RecentEntries;
