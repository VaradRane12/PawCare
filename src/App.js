import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from './Navbar';
import AdoptBanner from './AdoptBanner';
import QuickActionButton from './QuickActionButtons';
import SponsorBanner from './SponsorBanner';
import Footer from './Footer';
import Adopt from "./Adopt";
import VolunteerPage from "./VolunteerPage";
import Faq from "./Faq";
import DogAdoptionPage from "./DogAdoptionPage";
function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/home-data")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching home data:", err));
  }, []);

  if (!data) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="App">
<div className="space-y-4">
  <Navbar />
  <QuickActionButton />
  <SponsorBanner
        image={data.banner_image}  // use full external URL directly
        amountDonated={data.amount_donated}
        totalAmount={data.total_amount}
      />
        <div className="blurred-gradient" />
      <AdoptBanner image={data.banner_image} />
      <Footer />
    </div>
</div>


    
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/volunteering" element={<VolunteerPage />} />
        <Route path="/faq" element={<Faq />} /> 
        <Route path="/dog-adoption" element={<DogAdoptionPage />} />

        {/* <Route path="/donate" element={<Donate />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
