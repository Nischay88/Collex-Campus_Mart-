import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onLoginClick, onSignUpClick }) => {
  const [buyer, setBuyer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if buyer is logged in
    const buyerToken = localStorage.getItem('buyerToken');
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');
    
    if (buyerToken && userRole === 'BUYER') {
      // TODO: Fetch buyer details from backend
      // const response = await fetch('http://localhost:8080/api/users/me', {
      //   headers: { 'Authorization': `Bearer ${buyerToken}` }
      // });
      // const data = await response.json();
      
      // Dummy buyer data
      setBuyer({
        email: userEmail || 'buyer@example.com',
        name: userEmail ? userEmail.split('@')[0] : 'Buyer',
        fullName: 'John Buyer'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('buyerToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setBuyer(null);
    navigate('/');
    window.location.reload(); // Refresh to update header
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h1>CampusMart</h1>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#about" className="nav-link">About</a>
        </nav>
        <div className="header-actions">
          {buyer ? (
            <div className="buyer-profile">
              <div className="profile-info">
                <div className="profile-icon">👤</div>
                <span className="buyer-name">{buyer.fullName || buyer.name}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="btn-login" onClick={onLoginClick}>
                Login
              </button>
              <button className="btn-signup" onClick={onSignUpClick}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

