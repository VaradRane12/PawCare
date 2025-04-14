import React from "react";

const DonateCharacteristics = () => {
    const characteristics = [
    {
        title: "Every Dollar Counts",
        info: "Even small donations can provide food, medicine, and shelter to animals in need.",
      },
      {
        title: "Transparent Impact",
        info: "We keep our donors informed about how their contributions are making a difference.",
      },
      {
        title: "Sustainable Support",
        info: "Your donations help us plan long-term rescues, adoptions, and care programs.",
      },
];


  return (
    <div className="adopt-characteristics-container">
      {characteristics.map((char, index) => (
        <div key={index} className="adopt-characteristics-box">
          <h2 className="adopt-characteristics-title">{char.title}</h2>
          <div className="adopt-characteristics-info">{char.info}</div>
        </div>
      ))}
    </div>
  );
};

export default DonateCharacteristics;