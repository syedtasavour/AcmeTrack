import React, { useState } from "react";
import emailIcon from "../assets/media/Mail.svg";
import passwordIcon from "../assets/media/password.svg"; // Adjust path and filename as needed

function Profile({ user }) {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSaveChanges = () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    console.log("Saving changes:", formData);
    // Example: Send formData to an API
  };

  // Handle cancel (reset form to initial values)
  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      userName: user?.userName || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  // Handle password reset (clear password fields)
  const handleResetPassword = () => {
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploading photo:", file.name);
      // Example: Upload file to server or update state
    }
  };

  // Handle photo deletion
  const handlePhotoDelete = () => {
    console.log("Deleting profile photo");
    // Example: Update state or API to remove photo
  };

  return (
    <div className="w-full max-w-[1121px] space-y-8">
      {/* Profile Picture Section */}
      <div className="relative">
        <img
          className="w-32 h-32 rounded-full"
          src={user?.photoUrl || "https://placehold.co/125x125"}
          alt="Profile"
        />
        <div className="mt-4 flex gap-4">
          <label className="w-44 h-14 px-0.5 py-1.5 bg-slate-600 rounded-lg outline outline-1 outline-slate-600 flex flex-col justify-center items-center cursor-pointer">
            <span className="text-center text-white text-sm font-bold font-['Montserrat'] leading-tight">
              Upload New Photo
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
          <button
            className="w-44 h-14 py-2 bg-white rounded-lg outline outline-1 outline-slate-600 flex justify-center items-center"
            onClick={handlePhotoDelete}
          >
            <span className="text-center text-slate-600 text-sm font-bold font-['Montserrat'] leading-tight">
              Delete
            </span>
          </button>
        </div>
        <div className="mt-2 text-slate-600 text-xl font-bold font-['Montserrat']">
          {formData.firstName} {formData.lastName}
        </div>
      </div>

      <hr className="border-stone-300" />

      {/* Personal Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-slate-600 text-base font-bold font-['Montserrat']">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="eg. Alaa"
            className="w-full mt-2 h-12 bg-white rounded-lg border border-gray-300 px-4 text-base font-normal font-['Montserrat'] text-gray-400"
          />
        </div>
        <div>
          <label className="text-slate-600 text-base font-bold font-['Montserrat']">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="eg. Mohamed"
            className="w-full mt-2 h-12 bg-white rounded-lg border border-gray-300 px-4 text-base font-normal font-['Montserrat'] text-gray-400"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-slate-600 text-base font-bold font-['Montserrat']">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="eg. alaa.mohamed"
            className="w-full mt-2 h-12 bg-white rounded-lg border border-gray-300 px-4 text-base font-normal font-['Montserrat'] text-gray-400"
          />
        </div>
      </div>

      <hr className="border-stone-300" />

      {/* Email Section */}
      <div>
        <label className="text-slate-600 text-base font-bold font-['Montserrat']">
          Email Address
        </label>
        <div className="relative mt-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="eg. alaa.mohamed@example.com"
            className="w-full h-14 bg-white rounded-lg border border-gray-300 pl-10 pr-4 text-base font-normal font-['Montserrat'] text-gray-400"
          />
          <img
            src={emailIcon}
            alt="Email Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>
      </div>

      <hr className="border-stone-300" />

      {/* Password Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-slate-600 text-base font-bold font-['Montserrat']">
            Current Password
          </label>
          <div className="relative mt-2">
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full h-16 bg-white rounded-lg border border-gray-300 pl-10 pr-4 text-base font-normal font-['Montserrat']"
            />
            <img
              src={passwordIcon}
              alt="Password Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>
        <div>
          <label className="text-slate-600 text-base font-bold font-['Montserrat']">
            New Password
          </label>
          <div className="relative mt-2">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full h-16 bg-white rounded-lg border border-gray-300 pl-10 pr-4 text-base font-normal font-['Montserrat']"
            />
            <img
              src={passwordIcon}
              alt="Password Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="text-slate-600 text-base font-bold font-['Montserrat']">
            Confirm New Password
          </label>
          <div className="relative mt-2">
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              className="w-full h-16 bg-white rounded-lg border border-gray-300 pl-10 pr-4 text-base font-normal font-['Montserrat']"
            />
            <img
              src={passwordIcon}
              alt="Password Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          className="w-48 h-12 px-5 py-2.5 bg-slate-600 rounded-lg outline outline-[3px] outline-slate-600 flex justify-center items-center"
          onClick={handleSaveChanges}
        >
          <span className="text-white text-sm font-bold font-['Montserrat'] leading-tight">
            Save Changes
          </span>
        </button>
        <button
          className="w-48 h-12 px-5 py-2.5 bg-white rounded-lg outline outline-1 outline-slate-600 flex justify-center items-center"
          onClick={handleCancel}
        >
          <span className="text-slate-600 text-sm font-bold font-['Montserrat'] leading-tight">
            Cancel
          </span>
        </button>
        <button
          className="w-48 h-12 px-5 py-2.5 bg-white rounded-lg outline outline-1 outline-slate-600 flex justify-center items-center"
          onClick={handleResetPassword}
        >
          <span className="text-slate-600 text-sm font-bold font-['Montserrat'] leading-tight">
            Reset Password
          </span>
        </button>
      </div>
    </div>
  );
}

export default Profile;
