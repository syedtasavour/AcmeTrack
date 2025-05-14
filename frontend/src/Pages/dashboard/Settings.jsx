import SideBar from "../../components/sideBar";
import Profile from "../../components/profile";
function Settings() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-300">
        <SideBar />
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* First Row: NextShipment */}
        <div className="mb-8">
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Settings;
