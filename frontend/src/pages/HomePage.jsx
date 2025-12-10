import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import RoleSelectionModal from '../components/RoleSelectionModal';
import './HomePage.css';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      icon: '📚',
      title: 'Books',
      description: 'Textbooks, novels, and study guides'
    },
    {
      icon: '💻',
      title: 'Electronics',
      description: 'Laptops, phones, and gadgets'
    },
    {
      icon: '📝',
      title: 'Notes & Study Material',
      description: 'Class notes and study guides'
    },
    {
      icon: '🎒',
      title: 'Accessories',
      description: 'Bags, cases, and more'
    },
    {
      icon: '🔢',
      title: 'Calculators',
      description: 'Scientific and graphing calculators'
    },
    {
      icon: '📦',
      title: 'Other Items',
      description: 'Miscellaneous college essentials'
    }
  ];

  // Fetch only APPROVED products from backend
  useEffect(() => {
    fetchApprovedProducts();
  }, []);

  const fetchApprovedProducts = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch('http://localhost:8080/api/products?status=APPROVED', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // const data = await response.json();
      // setApprovedProducts(data.products);

      // Simulated API call with dummy data (only APPROVED products)
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockApprovedProducts = [
        {
          id: 101,
          image: '📚',
          title: 'Introduction to Algorithms',
          condition: 'Like New',
          price: 45,
          status: 'APPROVED'
        },
        {
          id: 102,
          image: '💻',
          title: 'MacBook Pro 13"',
          condition: 'Used',
          price: 850,
          status: 'APPROVED'
        },
        {
          id: 103,
          image: '📝',
          title: 'Calculus Study Notes',
          condition: 'New',
          price: 15,
          status: 'APPROVED'
        },
        {
          id: 104,
          image: '🔢',
          title: 'TI-84 Plus Calculator',
          condition: 'Like New',
          price: 75,
          status: 'APPROVED'
        },
        {
          id: 105,
          image: '📚',
          title: 'Organic Chemistry Textbook',
          condition: 'Used',
          price: 60,
          status: 'APPROVED'
        },
        {
          id: 106,
          image: '💻',
          title: 'iPad Air 4th Gen',
          condition: 'Like New',
          price: 450,
          status: 'APPROVED'
        }
      ];

      // Filter to show only APPROVED products
      const filtered = mockApprovedProducts.filter(p => p.status === 'APPROVED');
      setApprovedProducts(filtered);
    } catch (error) {
      console.error('Error fetching approved products:', error);
      setApprovedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage">
      <Header 
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
      />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to CampusMart</h1>
            <p className="hero-tagline">
              Buy and Sell Pre-Owned College Essentials at Best Prices
            </p>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search books, electronics, notes..."
              />
              <button className="search-button">🔍</button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section" id="categories">
          <div className="section-container">
            <h2 className="section-title">Browse Categories</h2>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="featured-section">
          <div className="section-container">
            <h2 className="section-title">Recently Added Items</h2>
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : approvedProducts.length === 0 ? (
              <div className="empty-products">
                <p>No approved products available at the moment.</p>
              </div>
            ) : (
              <div className="products-grid">
                {approvedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    condition={product.condition}
                    price={product.price}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isLogin={isLogin}
      />
    </div>
  );
};

export default HomePage;

