import React, { useState } from "react";
import axios from "axios";
import emailIcon from "../assets/media/Mail.svg";
import passwordIcon from "../assets/media/password.svg";

function Profile({ user }) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    photoPreview: "", // for instant preview
  });

  const [photoFile, setPhotoFile] = useState(null);

  const configJSON = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  const configFormData = {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    // Validate password fields only if the user wants to change password
    if (
      formData.newPassword ||
      formData.confirmNewPassword ||
      formData.currentPassword
    ) {
      if (!formData.currentPassword) {
        alert("Please enter your current password to change your password.");
        return;
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        alert("New password and confirm password do not match!");
        return;
      }
    }

    try {
      // Prepare only fields that have values and differ from initial user data for update
      const profileUpdates = {};

      if (formData.firstName && formData.firstName !== user?.firstName)
        profileUpdates.firstName = formData.firstName;
      if (formData.lastName && formData.lastName !== user?.lastName)
        profileUpdates.lastName = formData.lastName;
      if (formData.username && formData.username !== user?.username)
        profileUpdates.username = formData.username;
      if (formData.email && formData.email !== user?.email)
        profileUpdates.email = formData.email;

      // Only send update if at least one field changed
      if (Object.keys(profileUpdates).length > 0) {
        await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/users/update-profile-details`,
          profileUpdates,
          configJSON
        );
      }

      // Update password if fields are filled (user wants to change password)
      if (formData.currentPassword && formData.newPassword) {
        await axios.patch(
          `${import.meta.env.VITE_API_BASE_URL}/users/password`,
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmNewPassword,
          },
          configJSON
        );
      }

      alert("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleResetPassword = () => {
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);

    // Show preview instantly
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      photoPreview: previewUrl,
    }));

    try {
      const data = new FormData();
      data.append("profileImage", file);

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-profile-picture`,
        data,
        configFormData
      );

      alert("Photo uploaded successfully.");
    } catch (error) {
      console.error("Photo upload error:", error);
      alert("Failed to upload photo.");
    }
  };

  const handlePhotoDelete = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/delete-profile-picture`,
        null,
        configFormData
      ); // Adjust if there's a delete API
      alert(res.data.message);
      setPhotoFile(null);
      setFormData((prev) => ({ ...prev, photoPreview: "" }));
      alert("Profile photo deleted.");
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data.match(/<pre>(.*?)<br>/s)?.[1] || "Signup failed";
      alert(message);
    }
  };

  return (
    <div className="w-full max-w-[1121px] space-y-8">
      {/* Profile Picture Section */}
      <div className="relative">
        <img
          className="w-32 h-32 rounded-full"
          src={
            formData.photoPreview ||
            user?.photoUrl ||
            "https://placehold.co/125x125"
          }
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
            name="username"
            value={formData.username}
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
      <div className="mb-2 text-sm italic text-gray-500">
        * Note: Fill password fields only if you want to change your password.
      </div>
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
