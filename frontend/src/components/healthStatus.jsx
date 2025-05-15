import React, { useEffect, useState } from "react";
import axios from "axios";

function HealthStatus() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/health/health-status`,
          {
            withCredentials: true, // This allows sending cookies with the request
          }
        );
        setData(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch health data");
      }
    };

    fetchHealthData();
  }, []);

  return (
    <div className="p-4 bg-zinc-50 rounded-lg shadow-sm max-w-xs w-full">
      <div className="text-zinc-900 text-lg font-semibold font-['Plus_Jakarta_Sans'] mb-4">
        Health Status
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-zinc-900">
                {item.label}
              </span>
              <span className="text-xs text-zinc-700">{item.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full relative">
              <div
                className="h-1.5 bg-teal-500 rounded-full absolute top-0 left-0"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthStatus;
