import SideBar from "../../components/SideBar";
import AddHealthLog from "../../components/AddHealthLog";
import RecentEntries from "../../components/RecentEntries";
import TodaySummary from "../../components/TodaySummary";

function Health() {
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
          <RecentEntries />
          <TodaySummary />
        </div>
      </div>
    </div>
  );
}

export default Health;
