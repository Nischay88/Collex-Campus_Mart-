import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerProducts from '../components/SellerProducts';
import '../styles/SellerDashboard.css';

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if seller is logged in
    const sellerToken = localStorage.getItem('sellerToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!sellerToken || userRole !== 'SELLER') {
      navigate('/login/seller');
      return;
    }

    // Fetch seller info
    const userEmail = localStorage.getItem('userEmail');
    setUser({ email: userEmail || 'seller@example.com' });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('sellerToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login/seller');
  };

  const handleAddProduct = () => {
    navigate('/seller/add-product');
  };

  if (!user) {
    return (
      <div className="seller-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Seller Dashboard</h1>
            <p className="dashboard-subtitle">Manage your products and listings</p>
          </div>
          <div className="header-right">
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-actions">
          <button className="add-product-btn" onClick={handleAddProduct}>
            + Add New Product
          </button>
        </div>

        <div className="dashboard-content">
          <h2 className="section-title">My Products</h2>
          <SellerProducts />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;

