import { useState } from "react";
import axios from "axios";

function AddHealthLog() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    heartRate: "",
    bloodPressure: "",
    symptoms: "",
    medications: [{ type: "", customType: "", dosage: "", time: "" }],
  });

  const [errors, setErrors] = useState({});

  // State to hold submission status message
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    if (index !== null && field) {
      const updatedMedications = [...formData.medications];
      updatedMedications[index][field] = value;
      setFormData({ ...formData, medications: updatedMedications });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear specific field error on change
    if (index !== null && field) {
      setErrors((prev) => ({
        ...prev,
        [`medications.${index}.${field}`]: false,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    // Clear submit message on any input change
    setSubmitMessage("");
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { type: "", customType: "", dosage: "", time: "" },
      ],
    });
  };

  const removeMedication = (index) => {
    const updatedMedications = formData.medications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, medications: updatedMedications });
  };

  const validate = () => {
    const newErrors = {};

    // Validate main required fields
    if (!formData.weight) newErrors.weight = true;
    if (!formData.height) newErrors.height = true;
    if (!formData.heartRate) newErrors.heartRate = true;
    if (!formData.bloodPressure) newErrors.bloodPressure = true;

    // Validate medications
    formData.medications.forEach((med, idx) => {
      if (!med.type) newErrors[`medications.${idx}.type`] = true;
      if (med.type === "Other" && !med.customType)
        newErrors[`medications.${idx}.customType`] = true;
      if (!med.dosage) newErrors[`medications.${idx}.dosage`] = true;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setSubmitMessage("");
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      dailyWeight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      heartRate: parseInt(formData.heartRate),
      bloodPressure: formData.bloodPressure,
      symptomsMood: formData.symptoms,
      medications: formData.medications.map((med) => ({
        type: med.type === "Other" ? med.customType : med.type,
        dosage: med.dosage,
        time: med.time,
      })),
    };

    try {
      const config = {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      };
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/health/add-health-log`,
        payload,
        config
      );

      // Clear form on success
      setFormData({
        weight: "",
        height: "",
        heartRate: "",
        bloodPressure: "",
        symptoms: "",
        medications: [{ type: "", customType: "", dosage: "", time: "" }],
      });
      setErrors({});

      // Display success message
      setSubmitMessage("Health log submitted successfully.");
    } catch (error) {
      console.error("Submit Error:", error);

      // Display error message
      setSubmitMessage("Submission failed. Please try again.");
    }
  };

  return (
    <div className="w-[760px] h-auto relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400 p-6">
      <h2 className="text-zinc-900 text-2xl font-medium mb-1">
        Today's Health Log
      </h2>
      <p className="text-zinc-900 text-sm mb-6">
        Record your daily health updates.
      </p>

      {/* Weight */}
      <label className="block text-sm font-medium mb-1">
        Daily Weight (lbs) <span className="text-red-600">*</span>
      </label>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleInputChange}
        placeholder="e.g., 185.5"
        className={`w-full h-10 mb-4 bg-white outline px-3 text-sm ${
          errors.weight ? "outline-red-500" : "outline-neutral-300"
        } outline-1`}
      />

      {/* Height */}
      <label className="block text-sm font-medium mb-1">
        Daily Height (inches) <span className="text-red-600">*</span>
      </label>
      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleInputChange}
        placeholder="e.g., 72"
        className={`w-full h-10 mb-4 bg-white outline px-3 text-sm ${
          errors.height ? "outline-red-500" : "outline-neutral-300"
        } outline-1`}
      />

      {/* Heart Rate */}
      <label className="block text-sm font-medium mb-1">
        Heart Rate (bpm) <span className="text-red-600">*</span>
      </label>
      <input
        type="number"
        name="heartRate"
        value={formData.heartRate}
        onChange={handleInputChange}
        placeholder="e.g., 72"
        className={`w-full h-10 mb-4 bg-white outline px-3 text-sm ${
          errors.heartRate ? "outline-red-500" : "outline-neutral-300"
        } outline-1`}
      />

      {/* Blood Pressure */}
      <label className="block text-sm font-medium mb-1">
        Blood Pressure (mmHg) <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        name="bloodPressure"
        value={formData.bloodPressure}
        onChange={handleInputChange}
        placeholder="e.g., 120/80"
        className={`w-full h-10 mb-4 bg-white outline px-3 text-sm ${
          errors.bloodPressure ? "outline-red-500" : "outline-neutral-300"
        } outline-1`}
      />

      {/* Medications */}
      <label className="block text-sm font-medium mb-2">
        Medication Intake <span className="text-red-600">*</span>
      </label>
      {formData.medications.map((med, index) => (
        <div key={index} className="flex flex-wrap items-center gap-2 mb-3">
          <select
            value={med.type}
            onChange={(e) => handleInputChange(e, index, "type")}
            className={`w-1/3 h-10 bg-white outline px-3 text-sm ${
              errors[`medications.${index}.type`]
                ? "outline-red-500"
                : "outline-gray-600"
            } outline-1`}
          >
            <option value="">Select Type</option>
            <option value="Antibiotic">Antibiotic</option>
            <option value="Painkiller">Painkiller</option>
            <option value="Other">Other</option>
          </select>

          {med.type === "Other" && (
            <input
              type="text"
              placeholder="Enter medication name"
              value={med.customType}
              onChange={(e) => handleInputChange(e, index, "customType")}
              className={`w-1/3 h-10 bg-white outline px-3 text-sm ${
                errors[`medications.${index}.customType`]
                  ? "outline-red-500"
                  : "outline-neutral-300"
              } outline-1`}
            />
          )}

          <input
            type="text"
            value={med.dosage}
            onChange={(e) => handleInputChange(e, index, "dosage")}
            placeholder="Dosage (e.g., 500mg)"
            className={`w-1/4 h-10 bg-white outline px-3 text-sm ${
              errors[`medications.${index}.dosage`]
                ? "outline-red-500"
                : "outline-neutral-300"
            } outline-1`}
          />
          <input
            type="time"
            value={med.time}
            onChange={(e) => handleInputChange(e, index, "time")}
            className="w-1/4 h-10 bg-white outline outline-gray-600 px-3 text-sm"
          />
          {formData.medications.length > 1 && (
            <button
              type="button"
              onClick={() => removeMedication(index)}
              className="text-red-500 font-bold px-2"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addMedication}
        className="mb-6 bg-white outline outline-1 outline-gray-600 text-gray-700 text-sm px-4 py-1"
      >
        + Add Medication
      </button>

      {/* Symptoms */}
      <label className="block text-sm font-medium mb-1">Symptoms / Mood</label>
      <textarea
        name="symptoms"
        value={formData.symptoms}
        onChange={handleInputChange}
        placeholder="Enter any symptoms or how you're feeling..."
        className="w-full h-24 mb-6 bg-white outline outline-1 outline-neutral-300 px-3 py-2 text-sm"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full h-10 bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition"
      >
        Submit Health Log
      </button>

      {/* Submission Message */}
      {submitMessage && (
        <p className="mt-2 text-red-600 text-center font-semibold">
          {submitMessage}
        </p>
      )}
    </div>
  );
}

export default AddHealthLog;
