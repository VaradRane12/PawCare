import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <div className="navbar__pawprint"></div>
        <span className="navbar__title">
          <strong>PawCare</strong> <br /> <strong>Portal</strong>
        </span>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item">Adoption</li>
        <li className="navbar__item">Volunteering</li>
        <li className="navbar__item">Medical Records</li>
        <li className="navbar__item">Donation</li>
        <li className="navbar__item">FAQ</li>
        <li className="navbar__item">Awareness</li>
        <li className="navbar__item">Rescue Cases</li>
      </ul>
    </nav>
  );
};

export default Navbar;
