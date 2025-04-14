import React from "react";

const FoodBankCard = ({ image, itemName, quantityNeeded, urgencyLevel }) => {
  return (
    <div className="foodbank-card">
      <img src={image} alt={itemName} className="foodbank-image" />
      <div className="foodbank-info">
        <h3>{itemName}</h3>
        <p>Needed: {quantityNeeded}</p>
        <p className={`urgency ${urgencyLevel.toLowerCase()}`}>Urgency: {urgencyLevel}</p>
        <button className="foodbank-donate-btn">Donate This Item</button>
      </div>
    </div>
  );
};

export default FoodBankCard;
