import React, { useState } from "react";

const RescueReportForm = () => {
  const [reportData, setReportData] = useState({
    reporter: "",
    contact: "",
    animalType: "",
    condition: "",
    location: ""
  });

  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rescue reported:", reportData);
    alert("Rescue report received. Our team will respond promptly.");
  };

  return (
    <div className="rescue-report-form-container">
      <h2>Report a Rescue</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="reporter" placeholder="Your Name" required onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Number or Email" required onChange={handleChange} />
        <input type="text" name="animalType" placeholder="Type of Animal" required onChange={handleChange} />
        <textarea name="condition" placeholder="Condition of Animal / Notes" required onChange={handleChange}></textarea>
        <input type="text" name="location" placeholder="Location Found" required onChange={handleChange} />
        <button type="submit">Report Rescue</button>
      </form>
    </div>
  );
};

export default RescueReportForm;
