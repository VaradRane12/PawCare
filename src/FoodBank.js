import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FoodBankCard from "./FoodBankCard";
import { useEffect, useState } from "react";
const FoodBank = () => {

  const [foodItems, setFood] = useState([]);

  useEffect(() => {
    fetch("https://pawcare-zgpy.onrender.com/food-bank-items")
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error("Failed to fetch dogs:", err));
  }, []);


  return (
    <>
      <Navbar />
      <div className="foodbank-container">
        <h2>Support Our Food Bank</h2>
        <p>Donate food and supplies to help feed rescued animals in need.</p>
        <div className="foodbank-grid">
          {foodItems.map((item, index) => (
            <FoodBankCard key={index} {...item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FoodBank;
