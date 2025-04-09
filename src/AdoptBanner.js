import React from "react";
import { useNavigate } from "react-router-dom";

const AdoptBanner = ({ image }) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <section className="adopt-banner">
      <div className="adopt-banner__content">
        <img src={image} alt="Adoptable Dog" className="adopt-banner__image" />
        <div className="adopt-banner__text">
          <h2 className="adopt-banner__title">Adopt an Animal</h2>
          <p className="adopt-banner__description">
            Give a homeless pet a loving home—your kindness can change a life!
          </p>
          <div className="adopt-banner__buttons">
            <button className="adopt-banner__btn adopt-banner__btn--learn" onClick={() => navigate("/adopt")}>
              Learn More
            </button>
            <button className="adopt-banner__btn adopt-banner__btn--adopt" onClick={() => navigate("/adopt")}>
              Adopt an Animal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptBanner;
