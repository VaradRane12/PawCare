import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./index.css"; // Make sure your index.css includes the awareness-specific styles below

const Awareness = () => {
  return (
    <div className="awareness-page">
      <video className="awareness-full-video" autoPlay loop muted>
        <source src="/images/awareness.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="awareness-content-overlay">
        {/* You can keep the Navbar at the top if desired */}
        <Navbar />
        <div className="awareness-text-content">
          <h1>About PawCare</h1>
          <p>
            At PawCare, our mission is to transform the lives of animals through rescue, adoption, and sponsorship.
            We strive to raise awareness about animal cruelty, educate communities on responsible pet care, and
            build a supportive network to ensure every animal gets a loving home.
          </p>
          <h2>What We Do</h2>
          <p>
            Our website connects caring individuals with animals in need. Whether you choose to adopt, sponsor,
            or simply spread the word, your support enables us to provide food, shelter, and medical care for countless rescued animals.
          </p>
          <h2>Why It Matters</h2>
          <p>
            Animal cruelty remains a harsh reality across the world. Through compassion-driven initiatives,
            we advocate for humane treatment and work to end neglect and abuse. Every act of support helps break the cycle of cruelty.
          </p>
          <h2>Get Involved</h2>
          <p>
            Join us in making a difference! Explore our FAQs to learn more about our adoption process, sponsorship opportunities,
            and how you can help drive change.
          </p>
          <h2>Frequently Asked Questions</h2>
          <div className="awareness-faq-item">
            <h3>What services does PawCare provide?</h3>
            <p>
              We run rescue operations, facilitate pet adoptions, and offer sponsorship programs that fund medical care,
              shelter, and food for animals in need.
            </p>
          </div>
          <div className="awareness-faq-item">
            <h3>How can I contribute?</h3>
            <p>
              You can contribute in several ways: by adopting a pet, sponsoring their care, volunteering your time,
              or donating to support our mission.
            </p>
          </div>
          <div className="awareness-faq-item">
            <h3>How does the adoption process work?</h3>
            <p>
              Our adoption process is transparent and tailored to match animals with loving families. We assess the needs of each animal and provide
              post-adoption support to ensure the well-being of both pet and owner.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Awareness;
