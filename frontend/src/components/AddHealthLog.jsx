import React, { useState } from "react";

function AddHealthLog() {
  const [formData, setFormData] = useState({
    weight: "",
    heartRate: "",
    bloodPressure: "",
    symptoms: "",
    medications: [{ type: "", dosage: "", time: "" }],
  });

  const handleInputChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    if (index !== null && field) {
      const updatedMedications = [...formData.medications];
      updatedMedications[index][field] = value;
      setFormData({ ...formData, medications: updatedMedications });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { type: "", dosage: "", time: "" },
      ],
    });
  };

  const removeMedication = (index) => {
    const updatedMedications = formData.medications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, medications: updatedMedications });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonOutput = {
      date: new Date().toISOString(),
      ...formData,
    };
    console.log("Health Log JSON:", jsonOutput);
  };

  return (
    <div className="w-[760px] h-[580px] relative bg-white/0 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-400">
      <div className="left-[25px] top-[23px] absolute text-zinc-900 text-2xl font-medium font-['Inter']">
        Today's Health Log
      </div>
      <div className="left-[25px] top-[57px] absolute text-zinc-900 text-sm font-normal font-['Inter']">
        Record your daily health updates.
      </div>

      {/* Weight Input */}
      <div className="left-[25px] top-[103px] absolute text-zinc-900 text-sm font-medium font-['Inter']">
        Daily Weight (lbs)
      </div>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleInputChange}
        placeholder="e.g., 185.5"
        className="w-[709px] h-10 left-[25px] top-[127px] absolute bg-white outline outline-1 outline-neutral-300 px-3 text-sm"
      />

      {/* Heart Rate Input */}
      <div className="left-[25px] top-[175px] absolute text-zinc-900 text-sm font-medium font-['Inter']">
        Heart Rate (bpm)
      </div>
      <input
        type="number"
        name="heartRate"
        value={formData.heartRate}
        onChange={handleInputChange}
        placeholder="e.g., 72"
        className="w-[709px] h-10 left-[25px] top-[199px] absolute bg-white outline outline-1 outline-neutral-300 px-3 text-sm"
      />

      {/* Blood Pressure Input */}
      <div className="left-[25px] top-[247px] absolute text-zinc-900 text-sm font-medium font-['Inter']">
        Blood Pressure (mmHg)
      </div>
      <input
        type="text"
        name="bloodPressure"
        value={formData.bloodPressure}
        onChange={handleInputChange}
        placeholder="e.g., 120/80"
        className="w-[709px] h-10 left-[25px] top-[271px] absolute bg-white outline outline-1 outline-neutral-300 px-3 text-sm"
      />

      {/* Medication Inputs */}
      <div className="left-[25px] top-[319px] absolute text-zinc-900 text-sm font-medium font-['Inter']">
        Medication Intake
      </div>
      {formData.medications.map((med, index) => (
        <div
          key={index}
          className="w-[710px] h-16 left-[25px] top-[343px] absolute bg-white outline outline-1 outline-zinc-400 flex items-center space-x-4 px-3"
        >
          <select
            value={med.type}
            onChange={(e) => handleInputChange(e, index, "type")}
            className="w-52 h-10 bg-white outline outline-1 outline-gray-600 text-sm px-3"
          >
            <option value="">Select Type</option>
            <option value="Aspirin">Aspirin</option>
            <option value="Ibuprofen">Ibuprofen</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            value={med.dosage}
            onChange={(e) => handleInputChange(e, index, "dosage")}
            placeholder="Dosage (e.g., 10 mg)"
            className="w-52 h-10 bg-white outline outline-1 outline-neutral-300 px-3 text-sm"
          />
          <input
            type="time"
            value={med.time}
            onChange={(e) => handleInputChange(e, index, "time")}
            className="w-52 h-10 bg-white outline outline-1 outline-gray-600 px-3 text-sm"
          />
          {formData.medications.length > 1 && (
            <button
              onClick={() => removeMedication(index)}
              className="w-10 h-10 text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addMedication}
        className="w-40 h-9 left-[25px] top-[425px] absolute bg-white outline outline-1 outline-gray-600 text-gray-600 text-sm flex items-center justify-center space-x-2"
      >
        <span>+</span>
        <span>Add Medication</span>
      </button>

      {/* Symptoms Input */}
      <div className="left-[25px] top-[469px] absolute text-zinc-900 text-sm font-medium font-['Inter']">
        Symptoms / Mood
      </div>
      <textarea
        name="symptoms"
        value={formData.symptoms}
        onChange={handleInputChange}
        placeholder="Enter any additional notes, symptoms, or how you're feeling..."
        className="w-[709px] h-24 left-[25px] top-[493px] absolute bg-white outline outline-1 outline-neutral-300 px-3 py-2 text-sm"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-[710px] h-10 left-[25px] top-[605px] absolute bg-gray-600 text-white text-sm font-normal font-['Inter'] flex items-center justify-center"
      >
        Submit Update
      </button>
    </div>
  );
}

export default AddHealthLog;
