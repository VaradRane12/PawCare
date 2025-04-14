import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <div className="navbar__pawprint"></div>
        <span className="navbar__title">
          <strong>PawCare</strong> <br /> <strong>Portal</strong>
        </span>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item" onClick={() => navigate("/adopt")}>Adoption</li>
        <li className="navbar__item" onClick={() => navigate("/volunteering")}>Volunteering</li>
        <li className="navbar__item" onClick={() => navigate("/donate")}>Donation</li>
        <li className="navbar__item" onClick={() => navigate("/faq")}>Breed Detector</li>
        <li className="navbar__item" onClick={() => navigate("/awareness")}>FAQ</li>
        <li className="navbar__item" onClick={() => navigate("/food-bank")}>Food Bank</li>

      </ul>
    </nav>
  );
};

export default Navbar;
