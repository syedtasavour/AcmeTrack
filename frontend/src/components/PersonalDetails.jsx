import React, { useState } from "react";
import axios from "axios";

const GENDERS = ["male", "female", "other"];
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function PersonalDetails() {
  // State for form fields, errors, and submission status
  const [formData, setFormData] = useState({
    gender: "male",
    dateOfBirth: "", // Format: "MM/DD/YYYY" (e.g., "01/02/2005")
    bloodType: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form on submit
  const validateForm = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    else {
      // Validate date format (MM/DD/YYYY)
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
      if (!dateRegex.test(formData.dateOfBirth)) {
        newErrors.dateOfBirth = "Date must be in MM/DD/YYYY format";
      } else {
        // Validate date is a valid calendar date
        const [month, day, year] = formData.dateOfBirth.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        if (
          date.getFullYear() !== year ||
          date.getMonth() + 1 !== month ||
          date.getDate() !== day
        ) {
          newErrors.dateOfBirth = "Invalid date";
        } else {
          // Check if date is not in the future (as of May 16, 2025)
          const today = new Date(2025, 4, 16); // May 16, 2025
          if (date > today) {
            newErrors.dateOfBirth = "Date cannot be in the future";
          }
        }
      }
    }
    if (!formData.bloodType) newErrors.bloodType = "Blood Type is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const userData = {
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        bloodType: formData.bloodType,
      };

      const config = {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/update-personal-details`,
        userData,
        config
      );

      setSubmitMessage(
        response.data.message || "Personal details updated successfully."
      );

      // Reset form after successful submission
      setFormData({ gender: "male", dateOfBirth: "", bloodType: "" });
      setErrors({});
    } catch (error) {
      setSubmitMessage(
        error.response?.data?.message || "Failed to update personal details."
      );
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-5xl mx-auto p-4"
    >
      {/* Inline Form Fields */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
        {/* Gender Dropdown */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-slate-600 text-sm font-bold font-['Montserrat']">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full sm:w-40 h-9 px-2 bg-white border border-gray-600 text-gray-600 text-sm font-['Inter'] rounded outline-none"
            required
          >
            {GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs font-['Inter']">
              {errors.gender}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-slate-600 text-sm font-bold font-['Montserrat']">
            Date Of Birth
          </label>
          <input
            type="text"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="MM/DD/YYYY"
            className="w-full sm:w-40 h-9 px-2 bg-white border border-gray-600 text-gray-600 text-sm font-['Inter'] rounded outline-none"
            required
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs font-['Inter']">
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        {/* Blood Type Dropdown */}
        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-slate-600 text-sm font-bold font-['Montserrat']">
            Blood Type
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full sm:w-40 h-9 px-2 bg-white border border-gray-600 text-gray-600 text-sm font-['Inter'] rounded outline-none"
            required
          >
            <option value="" disabled>
              Select Blood Type
            </option>
            {BLOOD_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.bloodType && (
            <p className="text-red-500 text-xs font-['Inter']">
              {errors.bloodType}
            </p>
          )}
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-40 h-9 mt-20 sm:mt-0 bg-slate-600 text-white text-sm font-bold font-['Montserrat'] rounded-lg border-2 border-slate-600 transition ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-700"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Submission Message */}
      {submitMessage && (
        <p
          className={`text-sm font-['Inter'] ${
            submitMessage.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {submitMessage}
        </p>
      )}
    </form>
  );
}

export default PersonalDetails;
