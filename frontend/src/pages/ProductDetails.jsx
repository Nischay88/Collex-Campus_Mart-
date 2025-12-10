import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactSellerModal from '../components/ContactSellerModal';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch(`http://localhost:8080/api/products/${id}`, {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const data = await response.json();

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Dummy product data
      const mockProduct = {
        id: id,
        title: 'Introduction to Algorithms',
        description: 'This is a comprehensive textbook on algorithms and data structures. Used for one semester only. Excellent condition with minimal wear. Perfect for computer science students studying algorithms, data structures, and computational complexity.',
        category: 'Books',
        condition: 'Like New',
        price: 45,
        mrp: 50,
        ageInMonths: 3,
        images: ['📚', '📖', '📕'],
        sellerId: 'seller123',
        createdAt: '2025-01-15'
      };

      setProduct(mockProduct);

      // Fetch seller information
      await fetchSellerInfo(mockProduct.sellerId);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product details. Please try again.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerInfo = async (sellerId) => {
    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch(`http://localhost:8080/api/users/${sellerId}`, {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const data = await response.json();

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Dummy seller data
      const mockSeller = {
        id: sellerId,
        fullName: 'John Doe',
        email: 'john.doe@university.edu',
        collegeName: 'ABC University',
        phoneNumber: '+1 (555) 123-4567',
        profileImage: '👤'
      };

      setSeller(mockSeller);
    } catch (error) {
      console.error('Error fetching seller:', error);
    }
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="error-container">
          <h2>Product not found</h2>
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="details-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Products
        </button>

        <div className="product-layout">
          {/* Left Column - Images */}
          <div className="product-images-section">
            <div className="main-image">
              <div className="image-placeholder-large">
                {product.images && product.images.length > 0 ? product.images[0] : '📦'}
              </div>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.slice(1).map((img, index) => (
                  <div key={index} className="thumbnail">
                    {img}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-title">{product.title}</h1>
              <div className="product-price-large">${product.price}</div>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Condition:</span>
                <span className={`meta-value condition condition-${product.condition.toLowerCase().replace(' ', '-')}`}>
                  {product.condition}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Age:</span>
                <span className="meta-value">{product.ageInMonths} months</span>
              </div>
              {product.mrp && (
                <div className="meta-item">
                  <span className="meta-label">Original MRP:</span>
                  <span className="meta-value original-mrp">${product.mrp}</span>
                </div>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Seller Information */}
            {seller && (
              <div className="seller-section">
                <h3>Posted by Seller</h3>
                <div className="seller-info">
                  <div className="seller-profile">
                    <div className="seller-avatar">{seller.profileImage}</div>
                    <div className="seller-details">
                      <div className="seller-name">{seller.fullName}</div>
                      <div className="seller-college">{seller.collegeName}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="action-buttons">
              <button 
                className="contact-seller-btn"
                onClick={() => setShowContactModal(true)}
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      {showContactModal && seller && (
        <ContactSellerModal
          seller={seller}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;

