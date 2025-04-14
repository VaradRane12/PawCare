import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActionButton = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="rescue-container">
      <button className="rescue-btn" onClick={() => navigate("/sterilization")}>
        Schedule Sterilization
      </button>
      <button className="rescue-btn" onClick={() => navigate("/report-rescue")}>
        Report a Rescue
      </button>
      <button className="rescue-btn" onClick={() => navigate("/donate")}>
        Sponsor an Animal
      </button>
    </div>
  );
};

export default QuickActionButton;
