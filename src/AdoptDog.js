import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdoptionCard from "./AdoptionCard";

const AdoptDog = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/dog_adopt")
      .then((res) => res.json())
      .then((data) => setDogs(data))
      .catch((err) => console.error("Failed to fetch dogs:", err));
  }, []);

  return (
    <div className="adopt-cat-page">
      <Navbar />
      <div className="adopt-cat-container">
        <h1 className="adopt-cat-title">Meet Our Lovely Dogs 🐾</h1>
        <div className="adopt-cat-grid">
          {dogs.map((dog) => (
            <AdoptionCard
              key={dog.id}
              image={dog.image_url}
              name={dog.name}
              age={dog.age}
              breed={dog.breed}
              isPottyTrained={dog.is_potty_trained}
              vaccinated={dog.vaccinated}
              temperament={dog.temperament}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdoptDog;
