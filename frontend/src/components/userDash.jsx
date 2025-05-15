import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDash() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/user-dashboard`,
          {
            withCredentials: true,
          }
        );
        setUser(data.data);
        setErrors({});
      } catch (err) {
        console.error("Error fetching user:", err);
        setErrors((prev) => ({ ...prev, fetch: "Unable to load user data." }));
      }
    };

    fetchUser();
  }, []);

  const infoItems = user
    ? [
        {
          label: "Gender",
          value: user.gender,
          color: "bg-teal-500",
        },
        {
          label: "Age",
          value: user.age,
          color: "bg-pink-600",
        },
        {
          label: "Height",
          value: user.height,
          color: "bg-green-500",
        },
        {
          label: "Blood Type",
          value: user.bloodType,
          color: "bg-red-600",
        },
      ]
    : [];

  return (
    <div>
      <div className="px-5 pt-7 pb-5 bg-zinc-100 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex flex-col justify-start items-center gap-9">
        {errors.fetch ? (
          <div className="text-red-500 text-sm font-medium">{errors.fetch}</div>
        ) : user ? (
          <>
            <div className="w-36 flex flex-col justify-start items-center gap-5">
              <div className="w-24 h-24 relative bg-neutral-200 rounded-full outline outline-[1.5px] outline-offset-[-1.5px] outline-neutral-200 overflow-hidden">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-6 absolute left-[30.5px] top-[34px] bg-zinc-400" />
                )}
              </div>
              <div className="text-zinc-900 text-2xl font-semibold font-['Plus_Jakarta_Sans']">
                {user.name || "User"}
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
              </div>
            </div>
          </>
        ) : (
          <div className="text-zinc-500 text-sm">Loading user data...</div>
        )}
      </div>
    </div>
  );
}

export default UserDash;
