import React, { useState, useEffect } from "react";
import Logo from "../assets/media/Logo(Nav).png";
import EmailIcon from "../assets/media/Email Button.png";
import NotificationIcon from "../assets/media/Notification Button.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashNav({ userData }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [greetingSubtext, setGreetingSubtext] = useState("");

  useEffect(() => {
    // Determine greeting message based on current time
    const determineGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreetingMessage("Good Morning");
        setGreetingSubtext("Hope you feel better today.");
      } else if (hour >= 12 && hour < 17) {
        setGreetingMessage("Good Afternoon");
        setGreetingSubtext("Keep up the great work.");
      } else if (hour >= 17 && hour < 21) {
        setGreetingMessage("Good Evening");
        setGreetingSubtext("Hope you had a productive day.");
      } else {
        setGreetingMessage("Good Night");
        setGreetingSubtext("Time to rest and recharge.");
      }
    };

    determineGreeting();

    // Fetch user data
    const fetchUser = async () => {
      try {
        setError(null);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/user-dashboard`,
          { withCredentials: true }
        );
        setUser(data.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to load user data");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full bg-white border-b border-neutral-200">
      <div className="px-6 py-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 cursor-pointer"
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/dashboard/overview")}
          />
          <div
            className="text-black text-2xl font-bold font-['DM_Sans'] cursor-pointer"
            onClick={() => navigate("/dashboard/overview")}
          >
            AcmeTrack
          </div>
        </div>

        {/* Middle: Dynamic Greeting */}
        <div className="flex flex-col justify-center w-full md:w-auto">
          <div className="text-zinc-900 ml-10 text-2xl font-semibold font-['Plus_Jakarta_Sans']">
            {greetingMessage}
          </div>
          <div className="text-stone-500 ml-10 text-base font-normal font-['Inter']">
            {greetingSubtext}
          </div>
        </div>

        {/* Right: Icons and Profile */}
        <div className="flex items-center gap-6 ml-auto">
          <img
            className="w-12 h-12"
            src={NotificationIcon}
            alt="Notifications"
          />
          <img className="w-12 h-12" src={EmailIcon} alt="Email" />

          <div
            className="px-2.5 py-2 rounded-[10px] outline outline-1 outline-neutral-200 flex items-center gap-1.5 cursor-pointer"
            onClick={() => navigate("/dashboard/profile")}
          >
            <div className="flex items-center gap-[5px]">
              <div className="w-8 h-8 bg-neutral-200 rounded-md overflow-hidden">
                <img
                  src={user?.profilePicture} // fallback if available
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-zinc-900 text-sm font-normal font-['Inter']">
                {user?.name || "User"}
              </div>
            </div>
            <div className="w-6 h-6 relative rounded-[5px] overflow-hidden">
              <div className="w-0 h-2.5 absolute left-[7.5px] top-[10.25px] rotate-[-90deg] outline outline-[1.3px] outline-zinc-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Optional error message */}
      {error && (
        <div className="text-red-500 text-sm text-center mt-2 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}

export default DashNav;
