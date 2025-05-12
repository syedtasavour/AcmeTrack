import React from "react";

function UserDash({ userData }) {
  const { name, gender, age, height, bloodType } = userData;

  const infoItems = [
    {
      label: "Gender",
      value: gender,
      color: "bg-teal-500",
    },
    {
      label: "Age",
      value: `${age} y.o.`,
      color: "bg-pink-600",
    },
    {
      label: "Height",
      value: `${height}cm`,
      color: "bg-green-500",
    },
    {
      label: "Blood Type",
      value: bloodType,
      color: "bg-red-600",
    },
  ];

  return (
    <div>
      <div className="px-5 pt-7 pb-5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-center gap-9">
        <div className="w-36 flex flex-col justify-start items-center gap-5">
          <div className="w-24 h-24 relative bg-neutral-200 rounded-full outline outline-[1.5px] outline-offset-[-1.5px] outline-neutral-200 overflow-hidden">
            <div className="w-7 h-6 absolute left-[30.5px] top-[34px] bg-zinc-400" />
          </div>
          <div className="text-zinc-900 text-2xl font-semibold font-['Plus_Jakarta_Sans']">
            {name}
          </div>
        </div>
        <div className="flex flex-col justify-start items-center gap-10">
          <div className="flex flex-col justify-start items-center gap-6">
            <div className="w-80 flex flex-wrap justify-start items-center gap-[5px] content-center">
              {infoItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-start items-center gap-2.5"
                >
                  <div className="w-11 h-11 relative rounded-full outline outline-1 outline-offset-[-1px] outline-neutral-200 overflow-hidden">
                    <div
                      className={`absolute left-[13px] top-[13px] w-5 h-5 ${item.color}`}
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-0.5">
                    <div className="text-zinc-900 text-sm opacity-40 font-normal font-['Inter']">
                      {item.label}
                    </div>
                    <div className="text-zinc-900 text-xl font-semibold font-['Plus_Jakarta_Sans']">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2.5 bg-teal-500 rounded-[10px] inline-flex justify-center items-center gap-2.5">
              <div className="w-44 text-center text-zinc-100 text-base font-semibold font-['Plus_Jakarta_Sans']">
                See all information
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDash;
