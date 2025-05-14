import React from "react";
import MoveRight from "../assets/media/MoveRight.svg"; // Adjust the path as necessary
function NextShipment({ shipment }) {
  return (
    <div>
      <div className="w-[1067px] h-80 relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400">
        <div className="left-[25px] top-[26px] absolute justify-start text-zinc-900 text-2xl font-bold font-['Inter'] leading-loose">
          Next Shipment
        </div>
        <div className="left-[25px] top-[82px] absolute justify-start text-zinc-900 text-sm font-medium font-['Inter'] leading-tight">
          Medication
        </div>
        <div className="left-[25px] top-[104px] absolute justify-start text-zinc-900 text-lg font-medium font-['Inter'] leading-7">
          {shipment.medication}
        </div>
        <div className="left-[25px] top-[130px] absolute justify-start text-zinc-900 text-sm font-normal font-['Inter'] leading-tight">
          {shipment.dosage}
        </div>
        <div className="left-[421px] top-[82px] absolute justify-start text-zinc-900 text-sm font-medium font-['Inter'] leading-tight">
          Expected Delivery Date
        </div>
        <div className="left-[421px] top-[104px] absolute justify-start text-zinc-900 text-lg font-medium font-['Inter'] leading-7">
          {shipment.expectedDeliveryDate}
        </div>
        <div className="left-[818px] top-[82px] absolute justify-start text-zinc-900 text-sm font-medium font-['Inter'] leading-tight">
          Status
        </div>
        <div className="w-20 h-5 left-[818px] top-[105px] absolute bg-white/0 outline outline-1 outline-offset-[-1px] outline-black">
          <div className="w-2 h-2 left-[11px] top-[7px] absolute bg-white border-white" />
          <div className="left-[22px] top-[3px] absolute justify-start text-zinc-900 text-xs font-medium font-['Inter'] leading-none">
            {shipment.status}
          </div>
        </div>
        <div className="left-[818px] top-[147px] absolute justify-start text-zinc-900 text-xs font-normal font-['Inter'] leading-none">
          Progress: {shipment.progress}
        </div>
        <div className="left-[25px] top-[188px] absolute justify-start text-zinc-900 text-sm font-medium font-['Inter'] leading-tight">
          Carrier
        </div>
        <div className="w-4 h-4 left-[25px] top-[211px] absolute overflow-hidden">
          <div className="w-2.5 h-2.5 left-[0.64px] top-[1.97px] absolute bg-zinc-900" />
          <div className="w-1.5 h-[1.34px] left-[5.32px] top-[11.33px] absolute bg-zinc-900" />
          <div className="w-1.5 h-2 left-[8.65px] top-[4.65px] absolute bg-zinc-900" />
          <div className="w-1 h-1 left-[9.32px] top-[9.99px] absolute bg-zinc-900" />
          <div className="w-1 h-1 left-[2.66px] top-[9.99px] absolute bg-zinc-900" />
        </div>
        <div className="left-[45px] top-[208px] absolute justify-start text-zinc-900 text-base font-medium font-['Inter'] leading-normal">
          {shipment.carrier}
        </div>
        <div className="left-[421px] top-[188px] absolute justify-start text-zinc-900 text-sm font-medium font-['Inter'] leading-tight">
          Tracking Number
        </div>
        <div className="left-[421px] top-[209px] absolute justify-start text-zinc-900 text-base font-medium font-['Inter'] leading-normal">
          {shipment.trackingNumber}
        </div>
        <div className="left-[818px] top-[188px] absolute justify-start text-zinc-900 text-sm font-medium font-['Inter'] leading-tight">
          Refill Number
        </div>
        <div className="left-[818px] top-[209px] absolute justify-start text-zinc-900 text-base font-medium font-['Inter'] leading-normal">
          {shipment.refillNumber}
        </div>
        <div className="w-44 h-10 left-[818px] top-[246px] absolute bg-white/0 outline outline-1 outline-offset-[-1px] outline-gray-600 overflow-hidden">
          <div className="left-[77.39px] top-[9px] absolute justify-start"></div>
          <div className="w-4 h-4 left-[77.39px] top-[12px] absolute overflow-hidden">
            <img src={MoveRight} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextShipment;
