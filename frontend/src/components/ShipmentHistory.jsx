import React from "react";

function ShipmentHistory({ shipments }) {
  return (
    <div className="w-full max-w-[1214px]">
      <div className="w-48 h-6 justify-start text-zinc-900 text-2xl font-bold font-['Archivo'] leading-loose mb-5">
        Shipment History
      </div>
      <div className="relative bg-white/0 border-zinc-400">
        <div className="flex h-12 border-b border-zinc-400">
          <div className="w-32 px-4 py-3 text-zinc-900 text-xs font-medium font-['Inter']">
            Order Date
          </div>
          <div className="w-32 px-4 py-3 text-zinc-900 text-xs font-medium font-['Inter']">
            Status
          </div>
          <div className="w-96 px-4 py-3 text-zinc-900 text-xs font-medium font-['Inter']">
            Medication
          </div>
          <div className="w-32 px-4 py-3 text-zinc-900 text-xs font-medium font-['Inter']">
            Carrier
          </div>
          <div className="w-48 px-4 py-3 text-zinc-900 text-xs font-medium font-['Inter']">
            Tracking #
          </div>
        </div>
        {shipments.map((shipment, index) => (
          <div key={index} className="flex h-20 border-b border-zinc-400">
            <div className="w-32 px-4 py-6 text-zinc-900 text-sm font-medium font-['Inter']">
              {shipment.orderDate}
            </div>
            <div className="w-32 px-4 py-6">
              <div className="w-24 h-5 bg-white outline outline-1 outline-black flex items-center">
                <div className="w-2 h-2 ml-3 bg-white border-white" />
                <span className="ml-2 text-zinc-900 text-xs font-medium font-['Inter']">
                  {shipment.status}
                </span>
              </div>
            </div>
            <div className="w-96 px-4 py-4 text-zinc-900 text-sm font-medium font-['Inter']">
              <div>{shipment.medication}</div>
              <div className="text-sm font-normal">{shipment.dosage}</div>
            </div>
            <div className="w-32 px-4 py-6 text-zinc-900 text-sm font-normal font-['Inter']">
              {shipment.carrier}
            </div>
            <div className="w-48 px-4 py-6 text-zinc-900 text-sm font-normal font-['Inter']">
              {shipment.trackingNumber}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShipmentHistory;
