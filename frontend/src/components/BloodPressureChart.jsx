import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "JAN", value: 3.2 },
  { name: "FEB", value: 4 },
  { name: "MAR", value: 2.5 },
  { name: "APR", value: 3.5 },
  { name: "MAY", value: 3 },
  { name: "JUN", value: 2.8 },
];

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
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Blood Pressure</h2>
        <select className="border text-sm text-gray-700 px-2 py-1 rounded-md">
          <option>Month</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[1, 4]} />
          <Tooltip content={<CustomTooltip />} />
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
