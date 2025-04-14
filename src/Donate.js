import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DonateCharacteristics from "./DonateCharacteristics";
import SponsorBanner from "./SponsorBanner";

const Donate = () => {
    return (
      <div>
        <Navbar/>
        <DonateCharacteristics/>
        <SponsorBanner
        image="./images/y.jpg"
        amountDonated={750}
        totalAmount={2000}
        />
        <br />
        <SponsorBanner
        image="./images/y.jpg"
        amountDonated={1300}
        totalAmount={2500}
        />
        <br />
        <SponsorBanner
        image="./images/y.jpg"
        amountDonated={1900}
        totalAmount={3000}
        />
        <br />
        <Footer />
    </div>
  );
};

export default Donate;
