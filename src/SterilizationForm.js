import React, { useState } from "react";
const SterilizationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    petType: "",
    date: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sterilization scheduled:", formData);
    alert("Thank you! We’ll confirm your sterilization appointment shortly.");
  };

  return (
    <div className="sterilization-form-container">
      <h2>Schedule a Sterilization</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Number or Email" required onChange={handleChange} />
        <select name="petType" required onChange={handleChange}>
          <option value="">Type of Pet</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="date" required onChange={handleChange} />
        <input type="text" name="location" placeholder="Location / Address" required onChange={handleChange} />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};

export default SterilizationForm;
