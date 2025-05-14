import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuData = [
  {
    section: "General",
    items: [
      {
        name: "Overview",
        icon: "📊",
        path: "/dashboard/overview",
      },
      { name: "Health", icon: "❤️", path: "/dashboard/health" },
      {
        name: "Shipments",
        icon: "📦",
        path: "/dashboard/shipments",
      },
    ],
  },
  {
    section: "Support",
    items: [
      {
        name: "Settings",
        icon: "⚙️",
        path: "/dashboard/settings",
      },
    ],
  },
];

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  return (
    <div className="h-full w-64 bg-zinc-100 border-r border-neutral-200 flex flex-col items-center">
      {/* Menu Sections */}
      <div className="flex flex-col gap-7 w-full px-5">
        {menuData.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl text-zinc-900 opacity-50 mb-2">
              {section.section}
            </h2>
            <div className="flex flex-col gap-2">
              {section.items.map((item, idx) => {
                // Determine if the current item is active by comparing paths
                const isActive = location.pathname === item.path;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-[10px] cursor-pointer ${
                      isActive ? "bg-teal-500 text-white" : "hover:bg-zinc-200"
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span
                      className={`text-base ${
                        isActive ? "text-white" : "text-zinc-900 opacity-70"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
