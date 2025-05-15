import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-2xl">
        {payload[0].value}
      </div>
    );
  }

  return null;
};

const BloodPressureChart = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      setStatus("loading");
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/health/blood-pressure`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message || "Failed to fetch health data");
        setStatus("failed");
      }
    };

    fetchHealthData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Blood Pressure</h2>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[60, 180]} />
          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine
            y={80}
            label="Low (80)"
            stroke="blue"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={120}
            label="Medium (120)"
            stroke="orange"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={160}
            label="High (160)"
            stroke="red"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodPressureChart;
