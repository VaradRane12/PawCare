import React, { useEffect, useState } from "react";

const DogAdoptionPage = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pawcare-zgpy.onrender.com/api/dog_adopt")
      .then((res) => res.json())
      .then((data) => {
        setDogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dogs", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dog-adoption-page">
      <h1>Adoptable Dogs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : dogs.length > 0 ? (
        <div className="dog-list">
          {dogs.map((dog) => (
            <div key={dog.id} className="dog-card">
              <img src={dog.image_url} alt={dog.name} />
              <h3>{dog.name}</h3>
              <p>Breed: {dog.breed}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No dogs available for adoption.</p>
      )}
    </div>
  );
};

export default DogAdoptionPage;
