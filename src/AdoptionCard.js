import React from "react";

const AdoptionCard = ({ image, name, age, breed, isPottyTrained, vaccinated, temperament }) => {
  return (
    <div className="adoption-card">
      <img src={image} alt={name} className="adoption-card-image" />
      <div className="adoption-card-details">
        <h2>{name}</h2>
        <p><strong>Breed:</strong> {breed}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Potty Trained:</strong> {isPottyTrained ? "Yes" : "No"}</p>
        <p><strong>Vaccinated:</strong> {vaccinated ? "Yes" : "No"}</p>
        <p><strong>Temperament:</strong> {temperament}</p>
        <button className="adoption-card-button">Adopt Me 🐾</button>
      </div>
    </div>
  );
};

export default AdoptionCard;
