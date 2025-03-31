import React from "react";

const AdoptPageHero = ({ image1, image2, title }) => {
  return (
    <div className="adopt-page-hero">
      <img src={image1} alt="Adopt Stray 1" className="adopt-page-hero__image" />
      <img src={image2} alt="Adopt Stray 2" className="adopt-page-hero__image" />
      {title && <h1 className="adopt-page-hero__title">{title}</h1>}
    </div>
  );
};

export default AdoptPageHero;
