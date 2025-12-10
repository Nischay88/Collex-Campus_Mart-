import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SellerProducts.css';

const SellerProducts = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [products, setProducts] = useState({
    pending: [],
    approved: [],
    rejected: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch('http://localhost:8080/api/seller/products', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('sellerToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // Simulated API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockProducts = {
        pending: [
          {
            id: 1,
            title: 'Introduction to Algorithms',
            category: 'Books',
            price: 45,
            condition: 'Like New',
            status: 'PENDING',
            image: '📚',
            createdAt: '2025-01-15'
          },
          {
            id: 2,
            title: 'MacBook Pro 13"',
            category: 'Electronics',
            price: 850,
            condition: 'Used',
            status: 'PENDING',
            image: '💻',
            createdAt: '2025-01-14'
          }
        ],
        approved: [
          {
            id: 3,
            title: 'Calculus Study Notes',
            category: 'Notes & Study Material',
            price: 15,
            condition: 'New',
            status: 'APPROVED',
            image: '📝',
            createdAt: '2025-01-10'
          },
          {
            id: 4,
            title: 'TI-84 Plus Calculator',
            category: 'Calculators',
            price: 75,
            condition: 'Like New',
            status: 'APPROVED',
            image: '🔢',
            createdAt: '2025-01-08'
          }
        ],
        rejected: [
          {
            id: 5,
            title: 'Old Textbook',
            category: 'Books',
            price: 20,
            condition: 'Old',
            status: 'REJECTED',
            image: '📚',
            rejectionReason: 'Product condition does not meet quality standards',
            createdAt: '2025-01-05'
          }
        ]
      };

      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      // TODO: Replace with actual backend API endpoint
      // await fetch(`http://localhost:8080/api/seller/products/${productId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('sellerToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Remove product from state
      const updatedProducts = { ...products };
      Object.keys(updatedProducts).forEach(status => {
        updatedProducts[status] = updatedProducts[status].filter(p => p.id !== productId);
      });
      setProducts(updatedProducts);

      alert('Product deleted successfully!');
    } catch (error) {
      alert('Failed to delete product. Please try again.');
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/seller/edit/${productId}`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'APPROVED':
        return 'status-approved';
      case 'REJECTED':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const currentProducts = products[activeTab] || [];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="seller-products">
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Approval ({products.pending.length})
        </button>
        <button
          className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved ({products.approved.length})
        </button>
        <button
          className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected ({products.rejected.length})
        </button>
      </div>

      {currentProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No products found</h3>
          <p>You don't have any {activeTab} products yet.</p>
        </div>
      ) : (
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <div className="image-placeholder">{product.image}</div>
              </div>
              
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-details">
                  <span className="detail-item">
                    <strong>Category:</strong> {product.category}
                  </span>
                  <span className="detail-item">
                    <strong>Price:</strong> ${product.price}
                  </span>
                  <span className="detail-item">
                    <strong>Condition:</strong> {product.condition}
                  </span>
                </div>
                
                <div className="product-status">
                  <span className={`status-badge ${getStatusBadgeClass(product.status)}`}>
                    {product.status}
                  </span>
                </div>

                {product.rejectionReason && (
                  <div className="rejection-reason">
                    <strong>Rejection Reason:</strong>
                    <p>{product.rejectionReason}</p>
                  </div>
                )}

                <div className="product-actions">
                  {product.status === 'PENDING' && (
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProducts;

