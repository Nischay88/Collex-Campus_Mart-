import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuyerLogin from './pages/BuyerLogin';
import BuyerSignup from './pages/BuyerSignup';
import ProductDetails from './pages/ProductDetails';
import SellerLogin from './pages/SellerLogin';
import SellerSignup from './pages/SellerSignup';
import SellerDashboard from './pages/SellerDashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Buyer Routes */}
        <Route path="/login/buyer" element={<BuyerLogin />} />
        <Route path="/signup/buyer" element={<BuyerSignup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/buyer/dashboard" element={<div>Buyer Dashboard (Coming Soon)</div>} />
        
        {/* Seller Routes */}
        <Route path="/login/seller" element={<SellerLogin />} />
        <Route path="/signup/seller" element={<SellerSignup />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/add-product" element={<AddProduct />} />
        <Route path="/seller/edit/:id" element={<EditProduct />} />
        
        {/* Admin Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

