import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Left Section: Contact */}
        <div className="footer__contact">
          <h3>Contact Us</h3>
          <p>Email: support@pawcare.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        {/* Center Section: Address */}
        <div className="footer__address">
          <h3>Address</h3>
          <p>123 Paw Street, Pet City, PC 56789</p>
          <div className="footer__logo">
          </div>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="footer__social">
          <h3>Follow Us</h3>
          <div className="footer__icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <img src="/logo_pawprint.png" alt="PawCare Logo" className="footer__logo" />
          <p>© 2025 PawCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
