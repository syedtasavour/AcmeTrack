import React from "react";

const menuData = [
  {
    section: "General",
    items: [
      { name: "Overview", icon: "📊", active: true },
      { name: "Health", icon: "❤️", active: false },
      { name: "Shipments", icon: "📦", active: false },
    ],
  },
  {
    section: "Support",
    items: [
      { name: "Help Center", icon: "❓", active: false },
      { name: "Settings", icon: "⚙️", active: false },
    ],
  },
];

function SideBar() {
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
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-[10px] ${
                    item.active ? "bg-teal-500 text-white" : "hover:bg-zinc-200"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`text-base ${
                      item.active ? "text-white" : "text-zinc-900 opacity-70"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
