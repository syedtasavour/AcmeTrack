import SideBar from "../../components/sideBar";
import AddHealthLog from "../../components/AddHealthLog";
import RecentEntries from "../../components/RecentEntries";
import TodaySummary from "../../components/TodaySummary";

function Health() {
  const summaryData = {
    weight: "185 lbs",
    medications: 4,
    check: "Entered",
  };

  const sampleEntries = [
    {
      date: "Oct 25, 2023",
      weight: 184.9,
      meds: 4,
      note: "Felt better after rest...",
    },
    {
      date: "Oct 24, 2023",
      weight: 185.1,
      meds: 3,
      note: "Slight headache in the evening...",
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-300">
        <SideBar />
      </div>
      <div className="flex-1 p-8 ">
        {/* First row: AddHealthLog */}
        <div className="flex gap-6 mb-20">
          <AddHealthLog />
        </div>
        {/* Second row: RecentEntries and TodaySummary */}
        <div className="flex gap-6 mt-6">
          <RecentEntries entries={sampleEntries} />
          <TodaySummary summary={summaryData} />
        </div>
      </div>
    </div>
  );
}

export default Health;
