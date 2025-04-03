import React from "react";
import AdoptPageHero from "./AdoptPageHero";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AdoptCharacteristics from "./AdoptCharacteristics";

const Adopt = () => {
  return (
    <div>
      <Navbar/>
      <AdoptCharacteristics/>
      <AdoptPageHero catImage={require("./images/z.jpg")} dogImage={require("./images/x.jpg")} title="Adopt a Stray" />
      {/* Add other sections like adoptable pets, filters, etc. */}
      <Footer />
    </div>
  );
};

export default Adopt;
