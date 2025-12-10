import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in as admin
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/login/admin');
      return;
    }

    fetchPendingProducts();
  }, [navigate]);

  const fetchPendingProducts = async () => {
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch('http://localhost:8080/api/admin/products/pending', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // Simulated API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockProducts = [
        {
          id: 1,
          title: 'Introduction to Algorithms',
          sellerName: 'John Doe',
          sellerId: 'SELLER001',
          category: 'Books',
          price: 45,
          condition: 'Like New',
          createdDate: '2025-01-15',
          status: 'PENDING'
        },
        {
          id: 2,
          title: 'MacBook Pro 13"',
          sellerName: 'Jane Smith',
          sellerId: 'SELLER002',
          category: 'Electronics',
          price: 850,
          condition: 'Used',
          createdDate: '2025-01-14',
          status: 'PENDING'
        },
        {
          id: 3,
          title: 'Calculus Study Notes',
          sellerName: 'Mike Johnson',
          sellerId: 'SELLER003',
          category: 'Notes & Study Material',
          price: 15,
          condition: 'New',
          createdDate: '2025-01-13',
          status: 'PENDING'
        },
        {
          id: 4,
          title: 'TI-84 Plus Calculator',
          sellerName: 'Sarah Williams',
          sellerId: 'SELLER004',
          category: 'Calculators',
          price: 75,
          condition: 'Like New',
          createdDate: '2025-01-12',
          status: 'PENDING'
        },
        {
          id: 5,
          title: 'Organic Chemistry Textbook',
          sellerName: 'David Brown',
          sellerId: 'SELLER005',
          category: 'Books',
          price: 60,
          condition: 'Used',
          createdDate: '2025-01-11',
          status: 'PENDING'
        }
      ];

      setProducts(mockProducts);
    } catch (err) {
      setError('Failed to fetch pending products. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (productId) => {
    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch(`http://localhost:8080/api/admin/products/${productId}/approve`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Remove product from list after approval
      setProducts(products.filter(p => p.id !== productId));
      
      alert(`Product "${products.find(p => p.id === productId)?.title}" has been approved!`);
    } catch (err) {
      alert('Failed to approve product. Please try again.');
      console.error('Approve error:', err);
    }
  };

  const handleReject = async (productId) => {
    if (!window.confirm(`Are you sure you want to reject "${products.find(p => p.id === productId)?.title}"?`)) {
      return;
    }

    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch(`http://localhost:8080/api/admin/products/${productId}/reject`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Remove product from list after rejection
      setProducts(products.filter(p => p.id !== productId));
      
      alert(`Product "${products.find(p => p.id === productId)?.title}" has been rejected.`);
    } catch (err) {
      alert('Failed to reject product. Please try again.');
      console.error('Reject error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    navigate('/login/admin');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading pending products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">Review and manage pending products</p>
          </div>
          <div className="header-actions">
            <button className="refresh-btn" onClick={fetchPendingProducts}>
              🔄 Refresh
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {error && (
          <div className="error-banner">
            {error}
            <button className="error-close" onClick={() => setError('')}>×</button>
          </div>
        )}

        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-label">Pending Products</span>
            <span className="stat-value">{products.length}</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <h2>No Pending Products</h2>
            <p>All products have been reviewed. Great job!</p>
          </div>
        ) : (
          <div className="products-container">
            <h2 className="section-title">Products Awaiting Approval</h2>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <h3 className="product-title">{product.title}</h3>
                    <span className="product-status status-pending">PENDING</span>
                  </div>
                  
                  <div className="product-details">
                    <div className="detail-row">
                      <span className="detail-label">Seller:</span>
                      <span className="detail-value">{product.sellerName} ({product.sellerId})</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{product.category}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value price">${product.price}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Condition:</span>
                      <span className={`detail-value condition condition-${product.condition.toLowerCase().replace(' ', '-')}`}>
                        {product.condition}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">{product.createdDate}</span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <button
                      className="action-btn approve-btn"
                      onClick={() => handleApprove(product.id)}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="action-btn reject-btn"
                      onClick={() => handleReject(product.id)}
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

