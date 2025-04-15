import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/getvolunteers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch volunteers");
        return res.json();
      })
      .then((data) => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleJoinClick = () => {
    navigate("/volunteer-form");
  };

  return (
    <div className="volunteer-page">
      <Navbar />

      {/* CTA at the Top */}
      <div className="volunteer-cta-top">
        <h2>Want to Join Us?</h2>
        <p>
          Volunteering is a powerful way to help animals in need. Join the PawCare family
          and make a difference today!
        </p>
        <button className="join-button" onClick={handleJoinClick}>
          Become a Volunteer
        </button>
      </div>

      <div className="volunteer-hero">
        <h1>Meet Our Volunteers</h1>
        <p>
          These are the amazing people helping transform lives — one paw at a time.
        </p>
      </div>

      <div className="volunteer-container">
        {loading && <p className="loading">Loading volunteers...</p>}
        {error && <p className="error">{error}</p>}
        <ul className="volunteer-list">
          {volunteers.map((volunteer) => (
            <li key={volunteer.id} className="volunteer-card">
              <div className="volunteer-icon">🐾</div>
              <div className="volunteer-info">
                <h3>{volunteer.full_name}</h3>
                <p><strong>Email:</strong> {volunteer.email}</p>
                <p><strong>Location:</strong> {volunteer.city}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default VolunteerPage;
