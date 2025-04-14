import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdoptionCard from "./AdoptionCard";

const AdoptCat = () => {
  return (
    <div className="adopt-cat-page">
      <Navbar />
      <div className="adopt-cat-container">
        <h1 className="adopt-cat-title">Meet Our Lovely Cats 🐾</h1>
        <div className="adopt-cat-grid">
          <AdoptionCard
            image="/images/cat1.jpg"
            name="Whiskers"
            age="1 year"
            breed="Siamese"
            isPottyTrained={true}
            vaccinated={true}
            temperament="Playful and affectionate"
          />
          <AdoptionCard
            image="/images/cat2.jpg"
            name="Luna"
            age="2 years"
            breed="British Shorthair"
            isPottyTrained={true}
            vaccinated={false}
            temperament="Calm and cuddly"
          />
          <AdoptionCard
            image="/images/cat3.jpg"
            name="Milo"
            age="6 months"
            breed="Tabby"
            isPottyTrained={false}
            vaccinated={true}
            temperament="Curious and active"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdoptCat;
