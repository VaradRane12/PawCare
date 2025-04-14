import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from './Navbar';
import AdoptBanner from './AdoptBanner';
import QuickActionButton from './QuickActionButtons';
import SponsorBanner from './SponsorBanner';
import Footer from './Footer';
import Adopt from "./Adopt";
import VolunteerPage from "./VolunteerPage";
import Donate from "./Donate";
import Faq from "./Faq";
import DogAdoptionPage from "./DogAdoptionPage";
import Awareness from "./Awareness";
import AdoptCat from "./AdoptCat";
import AdoptDog from "./AdoptDog";
import FoodBank from "./FoodBank";
import SterilizationForm from "./SterilizationForm";
import RescueReportForm from "./RescueReportForm";
/*import PaymentPage from "./payment";*/
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
        id = {data.id}
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
        <Route path="/awareness" element={<Awareness />} />
        <Route path="/cat-adoption" element={<AdoptCat />} />
        <Route path="/dog-adoption" element={<AdoptDog />} />

        <Route path="/donate" element={<Donate />} />
        <Route path="/food-bank" element={<FoodBank />} />
        <Route path="/sterilization" element={<SterilizationForm />} />
        <Route path="/report-rescue" element={<RescueReportForm />} />


        
        {/*<Route path="/payment" element={<PaymentPage />} />*/}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
        {/*<Route path="/payment/:id/:payLimit" element={<PaymentPage />} />*/}
    </Router>
  );
}

export default App;
