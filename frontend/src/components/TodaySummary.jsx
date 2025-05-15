import React, { useState, useEffect } from "react";
import axios from "axios";
import Scale from "../../src/assets/media/scale.svg?react"; // Weight icon
import Pills from "../../src/assets/media/pill.svg?react"; // Medications icon
import heartRate from "../../src/assets/media/heart-pulse.svg"; // Heart icon

function TodaySummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/health/today-summary`,
          { withCredentials: true }
        );

        if (response.status === 200 && response.data?.data) {
          setSummary(response.data.data);
        } else {
          setSummary(null);
          setError("No data available for today.");
        }
      } catch (err) {
        setSummary(null);
        setError("Failed to fetch data. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="w-[606px] h-72 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6">
        <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
          Today's Summary
        </h2>
        <p className="text-zinc-900 text-sm font-normal font-['Inter'] mb-6">
          Loading summary...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[606px] h-72 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6">
        <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
          Today's Summary
        </h2>
        <p className="text-red-600 text-sm font-normal font-['Inter'] mb-6">
          {error}
        </p>
      </div>
    );
  }

  if (!summary) {
    // This is a fallback, should rarely hit due to above checks
    return (
      <div className="w-[606px] h-72 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6">
        <h2 className="text-zinc-900 text-2xl font-medium font-['Inter'] mb-1">
          Today's Summary
        </h2>
        <p className="text-zinc-900 text-sm font-normal font-['Inter'] mb-6">
          No data available for today.
        </p>
      </div>
    );
  }

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
          <img src={Scale} alt="Weight icon" />
          <span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              Weight:{" "}
            </span>
            <span className="text-zinc-900 text-sm font-medium font-['Inter']">
              {summary.dailyWeight ?? "N/A"}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img src={Pills} alt="Medications icon" />
          <span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              Medications:{" "}
            </span>
            <span className="text-zinc-900 text-sm font-medium font-['Inter']">
              {summary.medications?.length ?? 0}
            </span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              {" "}
              taken
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img src={heartRate} alt="Heart rate icon" />
          <span>
            <span className="text-zinc-900 text-sm font-normal font-['Inter']">
              Heart Rate:{" "}
            </span>
            <span className="text-zinc-900 text-sm font-medium font-['Inter']">
              {summary.heartRate ?? "N/A"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodaySummary;
