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
import Awareness from "./Awareness";
import AdoptCat from "./AdoptCat";
import AdoptDog from "./AdoptDog";
import FoodBank from "./FoodBank";
import SterilizationForm from "./SterilizationForm";
import RescueReportForm from "./RescueReportForm";
import PaymentPage from "./PaymentPage";
import VolunteerForm from "./VolunteerForm";
/*import PaymentPage from "./payment";*/
function Home() {
  const [data, setData] = useState(null);
  const [spoData, setspoData] = useState(null);
  useEffect(() => {
    fetch("https://pawcare-zgpy.onrender.com/home-data")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching home data:", err));
  }, []);
  useEffect(() => {
    fetch("https://pawcare-zgpy.onrender.com/least-donated-animal")
      .then(res => res.json())
      .then(setspoData)
      .catch(err => console.error("Error fetching home data:", err));
  }, []);

  if (!data) return <div className="text-center p-4">Loading...</div>;
  if (!spoData) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="App">
<div className="space-y-4">
  <Navbar />
  <QuickActionButton />
  <SponsorBanner
        id = {spoData.id}
        image={spoData.banner_image}  // use full external URL directly
        amountDonated={spoData.amount_donated}
        totalAmount={spoData.total_amount}
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
        <Route path="/volunteer-form" element={<VolunteerForm/>} />

        <Route path="/payment/:id/:payLimit" element={<PaymentPage />} />


        
        {/*<Route path="/payment" element={<PaymentPage />} />*/}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
