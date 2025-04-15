import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    reason: "",
    roles: [],
    availability: [],
  });

  const roles = ["Animal Care", "Fundraising", "Awareness Campaigns", "Events", "Fostering"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "roles") {
      setFormData((prev) => ({
        ...prev,
        roles: checked
          ? [...prev.roles, value]
          : prev.roles.filter((role) => role !== value),
      }));
    } else if (type === "checkbox" && name === "availability") {
      setFormData((prev) => ({
        ...prev,
        availability: checked
          ? [...prev.availability, value]
          : prev.availability.filter((day) => day !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const volunteerData = {
      full_name: formData.name,
      email: formData.email,
      phone_number: formData.phone,
      city: formData.city,
      motivation: formData.reason,
      preferred_roles: formData.roles,
      availability: formData.availability,
    };
    
    fetch("https://pawcare-zgpy.onrender.com/setvolunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(volunteerData),
    })
      .then((res) => {
        if (!res.ok) {
          // Log the server's error message
          return res.json().then((err) => {
            throw new Error(err.message || 'Failed to submit form');
          });
        }    
        return res.json();
      })
      .then((data) => {
        console.log("Volunteer successfully added:", data);
        setFormData({
          name: "",
          email: "",
          phone: "",
          city: "",
          reason: "",
          roles: [],
          availability: [],
        });
        alert("Thank you for your interest in volunteering! 🐾");
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        alert("There was an error while submitting your form. Please try again.");
      });
  };
  

  

  return (
    <div className="volunteer-form-page">
      <Navbar />
      <div className="volunteer-form-container">
        <h1 className="volunteer-form-title">Become a Volunteer</h1>
        <p className="volunteer-form-intro">
          Fill out this form to join our mission of making lives better for animals.
        </p>
        <form onSubmit={handleSubmit} className="volunteer-form">
          <label className="volunteer-form-label">
            Full Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label className="volunteer-form-label">
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label className="volunteer-form-label">
            Phone Number:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </label>

          <label className="volunteer-form-label">
            City:
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </label>

          <label className="volunteer-form-label">
            Why do you want to volunteer?
            <textarea name="reason" value={formData.reason} onChange={handleChange} rows="3" />
          </label>

          <fieldset className="volunteer-form-fieldset">
            <legend className="volunteer-form-legend">Preferred Volunteer Roles:</legend>
            {roles.map((role) => (
              <label key={role} className="volunteer-form-checkbox-option">
                <input
                  type="checkbox"
                  name="roles"
                  value={role}
                  checked={formData.roles.includes(role)}
                  onChange={handleChange}
                />
                {role}
              </label>
            ))}
          </fieldset>

          <fieldset className="volunteer-form-fieldset">
            <legend className="volunteer-form-legend">Availability:</legend>
            {days.map((day) => (
              <label key={day} className="volunteer-form-checkbox-option">
                <input
                  type="checkbox"
                  name="availability"
                  value={day}
                  checked={formData.availability.includes(day)}
                  onChange={handleChange}
                />
                {day}
              </label>
            ))}
          </fieldset>

          <button type="submit" className="volunteer-form-submit-btn">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default VolunteerForm;
