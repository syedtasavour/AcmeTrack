import Heart from "../../src/assets/media/heart-pulse.svg?react";
import { useEffect, useState } from "react";
import axios from "axios";

function RecentEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/health/recent-health-log`,
          { withCredentials: true }
        );

        if (response.status === 200 && response.data?.data?.length) {
          setEntries(response.data.data);
        } else {
          setEntries([]);
          setError("No recent entries found.");
        }
      } catch (err) {
        setEntries([]);
        setError("Failed to load recent entries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return (
      <div className="w-96 h-80 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6 flex flex-col items-center justify-center">
        <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
          Recent Entries
        </h2>
        <p className="text-zinc-900 text-sm font-normal font-['Inter']">
          Loading recent health logs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-96 h-80 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6 flex flex-col items-center justify-center">
        <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
          Recent Entries
        </h2>
        <p className="text-red-600 text-sm font-normal font-['Inter'] text-center">
          {error}
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="w-96 h-80 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6 flex flex-col items-center justify-center">
        <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
          Recent Entries
        </h2>
        <p className="text-zinc-900 text-sm font-normal font-['Inter'] text-center">
          No recent entries available.
        </p>
      </div>
    );
  }

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
              alt="Heart Rate icon"
              className="w-4 h-4 fill-zinc-900"
            />
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              {entry.heartRate ?? "N/A"}
            </span>
            <div className="w-1 h-1 rounded-full bg-zinc-400 mx-2" />
            <img
              src={Heart}
              alt="Blood Pressure icon"
              className="w-4 h-4 fill-zinc-900"
            />
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              {entry.bloodPressure ?? "N/A"}
            </span>
          </div>
          <p className="text-zinc-900 text-sm font-normal font-['Inter'] mt-1 max-w-[90%]">
            {entry.symptomsMood || "No symptoms/mood reported."}
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
