import React from "react";
import { useNavigate } from "react-router-dom";

const SponsorBanner = ({ id,image, amountDonated, totalAmount }) => {
  const navigate = useNavigate(); // Hook for navigation
  const progress = Math.min((amountDonated / totalAmount) * 100, 100);
  const payLimit = totalAmount-amountDonated
  return (
    <div className="sponsor-banner">
      <div className="sponsor-banner__content">
        <img src={image} alt="Sponsored Animal" className="sponsor-banner__image" />
        <div className="sponsor-banner__text">
          <h2 className="sponsor-banner__title">Sponsor an Animal</h2>
          <p className="sponsor-banner__description">
            Every little bit helps—be the reason this animal gets a second chance!
          </p>
          <div className="sponsor-banner__progress-container">
            <div className="sponsor-banner__progress-bar">
              <div className="sponsor-banner__progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="sponsor-banner__progress-info">
              <span>0</span>
              <span>100%</span>
            </div>
          </div>
          <p className="sponsor-banner__amount">{amountDonated} Rs Donated so far</p>
          <div className="sponsor-banner__buttons">
            <button
              className="sponsor-banner__btn sponsor-banner__btn--donate"
              onClick={() => navigate(`/payment/${id}/${payLimit}`)}
              >
              Donate!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorBanner;
