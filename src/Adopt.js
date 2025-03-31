import React from "react";
import AdoptPageHero from "./AdoptPageHero";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Adopt = () => {
  return (
    <div>
      <Navbar/>
      <AdoptPageHero image1={require("./images/x.jpg")} image2={require("./images/z.jpg")} title="Adopt a Stray" />
      {/* Add other sections like adoptable pets, filters, etc. */}
      <Footer />
    </div>
  );
};

export default Adopt;
