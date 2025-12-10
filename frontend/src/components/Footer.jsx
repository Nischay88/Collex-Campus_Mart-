import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* About Section */}
          <div className="footer-section footer-about">
            <div className="footer-logo">
              <h2 className="logo-text">CampusMart</h2>
              <p className="logo-tagline">Your College Marketplace</p>
            </div>
            <p className="footer-description">
              Connect with fellow students to buy and sell pre-owned college essentials. 
              Save money, reduce waste, and build a sustainable campus community.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook" title="Facebook">
                <span className="social-emoji">📘</span>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter" title="Twitter">
                <span className="social-emoji">🐦</span>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram" title="Instagram">
                <span className="social-emoji">📷</span>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn" title="LinkedIn">
                <span className="social-emoji">💼</span>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube" title="YouTube">
                <span className="social-emoji">📺</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><a href="#books">Books</a></li>
              <li><a href="#electronics">Electronics</a></li>
              <li><a href="#notes">Notes & Study Material</a></li>
              <li><a href="#accessories">Accessories</a></li>
              <li><a href="#calculators">Calculators</a></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="footer-section">
            <h3 className="footer-title">Support & Legal</h3>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#returns">Returns & Refunds</a></li>
              <li><a href="#safety">Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section footer-newsletter">
            <h3 className="footer-title">Stay Updated</h3>
            <p className="newsletter-description">
              Subscribe to get updates on new listings and exclusive deals!
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
            <div className="newsletter-benefits">
              <span className="benefit-item">✨ Weekly deals</span>
              <span className="benefit-item">📧 New listings</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              Copyright © 2025 <span className="copyright-brand">Collex</span>. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy</a>
              <span className="separator">|</span>
              <a href="#terms">Terms</a>
              <span className="separator">|</span>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-credits">
            <p>Made with ❤️ for college students</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

