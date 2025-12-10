import React from 'react';
import '../styles/ContactSellerModal.css';

const ContactSellerModal = ({ seller, onClose }) => {
  if (!seller) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">Contact Seller</h2>
          <p className="modal-subtitle">Get in touch with the seller</p>
        </div>

        <div className="seller-contact-info">
          <div className="seller-avatar-large">
            {seller.profileImage || '👤'}
          </div>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-label">
                <span className="contact-icon">👤</span>
                <span>Name</span>
              </div>
              <div className="contact-value">{seller.fullName}</div>
            </div>

            <div className="contact-item">
              <div className="contact-label">
                <span className="contact-icon">📧</span>
                <span>Email</span>
              </div>
              <div className="contact-value">
                <a href={`mailto:${seller.email}`} className="contact-link">
                  {seller.email}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-label">
                <span className="contact-icon">📞</span>
                <span>Phone</span>
              </div>
              <div className="contact-value">
                <a href={`tel:${seller.phoneNumber}`} className="contact-link">
                  {seller.phoneNumber}
                </a>
              </div>
            </div>

            {seller.collegeName && (
              <div className="contact-item">
                <div className="contact-label">
                  <span className="contact-icon">🏫</span>
                  <span>College</span>
                </div>
                <div className="contact-value">{seller.collegeName}</div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <p className="footer-note">
            💡 You can contact the seller via email or phone to discuss the product details and arrange a meeting.
          </p>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSellerModal;

