import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/media/Logo(Nav).png";
function Header() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 md:px-12 lg:px-24 h-16 flex justify-between items-center bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2" onClick={() => navigate("/")}>
        <img className="w-12 h-12" src={Logo} alt="Logo" />
        <div
          className="text-black text-2xl font-bold font-['DM_Sans'] leading-normal"
          onClick={() => navigate("/")}
        >
          AcmeTrack
        </div>
      </div>

      {/* Nav Items */}
      <div className="hidden md:flex items-center gap-7">
        <div
          className="text-neutral-400 text-base font-normal font-['Fredoka'] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </div>
        <div
          className="text-neutral-400 text-base font-normal font-['Fredoka'] cursor-pointer"
          onClick={() => navigate("/about")}
        >
          About
        </div>
        <div
          className="text-neutral-400 text-base font-normal font-['Fredoka'] cursor-pointer"
          onClick={() => navigate("/services")}
        >
          Services
        </div>
        <div
          className="text-neutral-400 text-base font-normal font-['Fredoka'] cursor-pointer"
          onClick={() => navigate("/login")}
        >
          login
        </div>
        <div
          className="h-10 px-5 bg-black rounded-[60px] flex justify-center items-center cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          <div className="text-stone-300 text-base font-semibold font-['Fredoka']">
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
