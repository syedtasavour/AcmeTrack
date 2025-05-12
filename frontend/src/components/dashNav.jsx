import React from "react";
import Logo from "../assets/media/Logo(Nav).png";
import EmailIcon from "../assets/media/Email Button.png";
import NotificationIcon from "../assets/media/Notification Button.png";

function DashNav({ userData }) {
  const { name, greetingMessage, greetingSubtext, avatarUrl } = userData;

  return (
    <div className="w-full bg-white border-b border-neutral-200">
      <div className="px-6 py-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
        {/* Left Section: Logo & Title */}
        <div className="flex items-center gap-3">
          <img className="w-12 h-12" src={Logo} alt="Logo" />
          <div className="text-black text-2xl font-bold font-['DM_Sans']">
            AcmeTrack
          </div>
        </div>

        {/* Middle Section: Greeting */}
        <div className="flex flex-col justify-center w-full md:w-auto">
          <div className="text-zinc-900 text-2xl font-semibold font-['Plus_Jakarta_Sans']">
            {greetingMessage}
          </div>
          <div className="text-stone-500 text-base font-normal font-['Inter']">
            {greetingSubtext}
          </div>
        </div>

        {/* Right Section: Notifications and User */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Notification Icons */}
          <img
            className="w-12 h-12"
            src={NotificationIcon}
            alt="Notifications"
          />
          <img className="w-12 h-12" src={EmailIcon} alt="Email" />

          {/* User Profile */}
          <div className="px-2.5 py-2 rounded-[10px] outline outline-1 outline-neutral-200 flex items-center gap-1.5">
            <div className="flex items-center gap-[5px]">
              <div className="w-8 h-8 bg-neutral-200 rounded-md overflow-hidden">
                <img
                  src={avatarUrl || "https://placehold.co/32x32"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-zinc-900 text-sm font-normal font-['Inter']">
                {name}
              </div>
            </div>
            <div className="w-6 h-6 relative rounded-[5px] overflow-hidden">
              <div className="w-0 h-2.5 absolute left-[7.5px] top-[10.25px] rotate-[-90deg] outline outline-[1.3px] outline-zinc-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashNav;
