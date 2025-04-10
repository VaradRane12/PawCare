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
        <li className="navbar__item" onClick={() => navigate("/medical-records")}>Medical Records</li>
        <li className="navbar__item" onClick={() => navigate("/donation")}>Donation</li>
        <li className="navbar__item" onClick={() => navigate("/faq")}>FAQ</li>
        <li className="navbar__item" onClick={() => navigate("/awareness")}>Awareness</li>
        <li className="navbar__item" onClick={() => navigate("/rescue-cases")}>Rescue Cases</li>
        <li className="navbar__item" onClick={() => navigate("/food-bank")}>Food Bank</li>

      </ul>
    </nav>
  );
};

export default Navbar;
