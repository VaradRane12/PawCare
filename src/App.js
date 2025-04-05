import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Navbar';
import AdoptBanner from './AdoptBanner';
import QuickActionButton from './QuickActionButtons';
import SponsorBanner from './SponsorBanner';
import Footer from './Footer';
import Adopt from "./Adopt";
import VolunteerPage from "./VolunteerPage";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <QuickActionButton />
      <SponsorBanner image={require("./images/adopt_banner_dog.jpg")} amountDonated={700} totalAmount={1000} />
      <div className="blurred-gradient" />
      <AdoptBanner image={require("./images/adopt_banner_dog.jpg")} />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt" element={<Adopt />}/>
        <Route path="/donate"/>
        <Route path="/volunteering" element={<VolunteerPage />} />
        {/*<Route path="*" element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
