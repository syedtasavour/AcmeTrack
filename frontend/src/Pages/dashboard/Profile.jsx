import PersonalDetails from "../../components/PersonalDetails";
import SideBar from "../../components/SideBar";
function Profile() {
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
          <PersonalDetails />
        </div>
        {/* Second Row: ShipmentHistory */}
      </div>
    </div>
  );
}

export default Profile;
