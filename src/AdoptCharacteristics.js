import React from "react";

const AdoptCharacteristics = () => {
  const characteristics = [
    {
      title: "Compassionate Care",
      info: "Our rescued animals are provided love and proper medical care before adoption.",
    },
    {
      title: "Trustworthy Process",
      info: "We ensure a smooth, transparent adoption process to find the perfect match.",
    },
    {
      title: "Supportive Community",
      info: "Join a network of adopters and volunteers who care about animal welfare.",
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

export default AdoptCharacteristics;