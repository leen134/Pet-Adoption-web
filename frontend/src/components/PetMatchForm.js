import React, { useState } from "react";
import "./Form.css";

export default function PetMatchForm({ onSubmit }) {
  const [answers, setAnswers] = useState({
    time: "",
    finances: "",
    commitment: "",
    stability: "",
    responsibility: "",
    support: ""
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noCount = Object.values(answers).filter((ans) => ans === "no").length;
    const result =
      noCount < 4
        ? "🎉 You are capable of adopting a pet!"
        : "⚠️ You may not be ready to adopt a pet.";
    onSubmit(result, answers); // pass result and answers back to page
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>♡ Are You Ready to Adopt a Pet?</h2>

      <label>Do you have enough time to care for a pet daily?</label>
      <select name="time" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>Do you have the financial means to support a pet?</label>
      <select name="finances" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>Are you willing to commit long-term to a pet’s care?</label>
      <select name="commitment" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>Is your living situation stable enough for a pet?</label>
      <select name="stability" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>Do you feel responsible enough to care for another life?</label>
      <select name="responsibility" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label>Do you have support from family or housemates for pet care?</label>
      <select name="support" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button type="submit">Check Adoption Readiness</button>
    </form>
  );
}