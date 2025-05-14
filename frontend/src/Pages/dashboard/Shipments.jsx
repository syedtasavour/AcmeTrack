import SideBar from "../../components/sideBar";
import NextShipment from "../../components/NextShipment";
import ShipmentHistory from "../../components/ShipmentHistory";

function Shipments() {
  const shipmentData = {
    medication: "Lisinopril",
    dosage: "90 tablets, 20mg",
    expectedDeliveryDate: "May 20, 2025",
    status: "In Transit",
    progress: "70%",
    carrier: "FedEx",
    trackingNumber: "98765432109876543210",
    refillNumber: "4",
  };

  const shipments = [
    {
      orderDate: "2023-09-15",
      status: "Delivered",
      medication: "Simvastatin",
      dosage: "30 tablets",
      carrier: "UPS",
      trackingNumber: "1234567890",
    },
    {
      orderDate: "2023-08-10",
      status: "Delivered",
      medication: "Metformin",
      dosage: "60 tablets",
      carrier: "USPS",
      trackingNumber: "0987654321",
    },
    {
      orderDate: "2023-07-05",
      status: "Exception",
      medication: "Lisinopril",
      dosage: "90 tablets",
      carrier: "FedEx",
      trackingNumber: "1122334455",
    },
    {
      orderDate: "2023-06-20",
      status: "Delivered",
      medication: "Simvastatin",
      dosage: "30 tablets",
      carrier: "UPS",
      trackingNumber: "6677889900",
    },
  ];

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
          <NextShipment shipment={shipmentData} />
        </div>
        {/* Second Row: ShipmentHistory */}
        <div>
          <ShipmentHistory shipments={shipments} />
        </div>
      </div>
    </div>
  );
}

export default Shipments;
