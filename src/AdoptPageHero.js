import React from "react";
import { useNavigate } from "react-router-dom";

const AdoptPageHero = ({ dogImage, catImage }) => {
  const navigate = useNavigate();

  return (
    <div className="adopt-page-hero">
      {/* Stray Dog Section */}
      <div
        className="adopt-page-hero__image-container"
        onClick={() => navigate("/dog-adoption")} // Redirects to dog adoption page
      >
        <img src={dogImage} alt="Adopt Stray Dog" className="adopt-page-hero__image" />
        <div className="adopt-page-hero__info">Learn more about adopting a stray dog!</div>
      </div>

      {/* Cat Section */}
      <div
        className="adopt-page-hero__image-container"
        onClick={() => navigate("/cat-adoption")} // Redirects to cat adoption page
      >
        <img src={catImage} alt="Adopt Stray Cat" className="adopt-page-hero__image" />
        <div className="adopt-page-hero__info">Discover how to adopt a stray cat!</div>
      </div>
    </div>
  );
};

export default AdoptPageHero;