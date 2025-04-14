import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DonateCharacteristics from "./DonateCharacteristics";
import SponsorBanner from "./SponsorBanner";

const Donate = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/donate") // Update this URL if hosted elsewhere
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.error("Failed to fetch donation animals:", err));
  }, []);

  return (
    <div>
      <div className="space-y-4">

      <Navbar />
      <DonateCharacteristics />

      {animals.map((animal) => (
        <div key={animal.id}>
          <SponsorBanner
          id = {animal.id}
            image={animal.image_url}
            amountDonated={animal.amount_donated}
            totalAmount={animal.total_amount}
          />
          <br />
        </div>
      ))}

      <Footer />
    </div>
    </div>

  );
};

export default Donate;
