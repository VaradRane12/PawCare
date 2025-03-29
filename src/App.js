import Navbar from './Navbar';
import AdoptBanner from './AdoptBanner';
import QuickActionButton from './QuickActionButtons';
import SponsorBanner from './SponsorBanner';

function App() {
  return (
    <div className="App">
      <Navbar />
      <QuickActionButton/>
      <SponsorBanner image={require("./images/adopt_banner_dog.jpg")} amountDonated={700} totalAmount={1000} />
      <div className="blurred-gradient"/>
      <AdoptBanner image={require("./images/adopt_banner_dog.jpg")}/>
    </div>
  );
}

export default App;
