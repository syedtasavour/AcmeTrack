import SideBar from "../../components/SideBar";
import NextShipment from "../../components/NextShipment";
import ShipmentHistory from "../../components/ShipmentHistory";

function Shipments() {
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
          <NextShipment />
        </div>
        {/* Second Row: ShipmentHistory */}
        <div>
          <ShipmentHistory />
        </div>
      </div>
    </div>
  );
}

export default Shipments;
