import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FoodBankCard from "./FoodBankCard";
const foodItems = [
  {
    image: "/images/dogfood.jpg",
    itemName: "Dry Dog Food",
    quantityNeeded: "20 Bags",
    urgencyLevel: "High"
  },
  {
    image: "/images/catcans.jpg",
    itemName: "Canned Cat Food",
    quantityNeeded: "50 Cans",
    urgencyLevel: "Medium"
  },
  {
    image: "/images/puppymilk.jpg",
    itemName: "Puppy Milk Formula",
    quantityNeeded: "15 Boxes",
    urgencyLevel: "High"
  },
  {
    image: "/images/treats.jpg",
    itemName: "Pet Treats",
    quantityNeeded: "100 Packs",
    urgencyLevel: "Low"
  }
];

const FoodBank = () => {
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
