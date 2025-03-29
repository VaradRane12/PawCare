import React from "react";

const QuickActionButton = () => {
  const handleClick = (action) => {
    alert(`You clicked: ${action}`);
  };

  return (
    <div className="rescue-container">
      <button className="rescue-btn" onClick={() => handleClick("Schedule Sterilization")}>
        Schedule Sterilization
      </button>
      <button className="rescue-btn" onClick={() => handleClick("Report a Rescue")}>
        Report a Rescue
      </button>
      <button className="rescue-btn" onClick={() => handleClick("Sponsor an Animal")}>
        Sponsor an Animal
      </button>
    </div>
  );
};

export default QuickActionButton;
