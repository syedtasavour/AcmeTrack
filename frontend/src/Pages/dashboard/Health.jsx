import SideBar from "../../components/sideBar";
import AddHealthLog from "../../components/AddHealthLog";

function Health() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-300">
        <SideBar />
      </div>

      <div className="flex-1 p-8">
        {/* First row: UserDash, HealthStatus, BloodPressureChart */}
        <div className="flex gap-6">
          <AddHealthLog />
        </div>
      </div>
    </div>
  );
}

export default Health;
