import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SellerLogin.css';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch('http://localhost:8080/api/auth/seller/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, role: 'SELLER' })
      // });
      // const data = await response.json();

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dummy validation - replace with actual API response
      const mockResponse = {
        success: true,
        user: {
          email: email,
          role: 'SELLER',
          token: 'mock-seller-token',
          name: 'Seller User'
        }
      };

      if (mockResponse.success) {
        // Store token in localStorage (in real app)
        localStorage.setItem('sellerToken', mockResponse.user.token);
        localStorage.setItem('userRole', 'SELLER');
        localStorage.setItem('userEmail', mockResponse.user.email);
        
        // Redirect to seller dashboard
        navigate('/seller/dashboard');
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (err) {
      setErrors({ submit: 'Login failed. Please try again.' });
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Seller Login</h1>
          <p className="login-subtitle">Welcome back! Sign in to manage your listings</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              disabled={loading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              disabled={loading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <Link to="/signup/seller" className="footer-link">
              Sign Up
            </Link>
          </p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;

