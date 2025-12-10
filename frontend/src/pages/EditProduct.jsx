import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    mrp: '',
    age: '',
    description: '',
    price: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const categories = [
    'Books',
    'Electronics',
    'Notes & Study Material',
    'Accessories',
    'Calculators',
    'Others'
  ];

  const conditions = ['New', 'Like New', 'Used', 'Old'];

  const ageOptions = [
    { value: 1, label: '1 month' },
    { value: 3, label: '3 months' },
    { value: 6, label: '6 months' },
    { value: 12, label: '1 year' },
    { value: 24, label: '2 years' },
    { value: 36, label: '2+ years' }
  ];

  // Auto price calculation function
  const calculateSuggestedPrice = (mrp, ageInMonths) => {
    if (!mrp || !ageInMonths) return 0;
    
    const mrpNum = parseFloat(mrp);
    if (isNaN(mrpNum)) return 0;

    if (ageInMonths <= 3) return mrpNum * 0.90;
    if (ageInMonths <= 6) return mrpNum * 0.80;
    if (ageInMonths <= 12) return mrpNum * 0.65;
    if (ageInMonths <= 24) return mrpNum * 0.50;
    return mrpNum * 0.40;
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setFetching(true);
    try {
      // TODO: Replace with actual backend API endpoint
      // const response = await fetch(`http://localhost:8080/api/seller/products/${id}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('sellerToken')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Dummy product data
      const mockProduct = {
        id: parseInt(id),
        title: 'Introduction to Algorithms',
        category: 'Books',
        condition: 'Like New',
        mrp: '50',
        age: '3',
        description: 'This is a comprehensive textbook on algorithms and data structures. Used for one semester only.',
        price: '45',
        images: ['📚', '📖']
      };

      setFormData({
        title: mockProduct.title,
        category: mockProduct.category,
        condition: mockProduct.condition,
        mrp: mockProduct.mrp,
        age: mockProduct.age.toString(),
        description: mockProduct.description,
        price: mockProduct.price
      });

      setExistingImages(mockProduct.images);
    } catch (error) {
      alert('Failed to load product. Please try again.');
      console.error('Fetch error:', error);
      navigate('/seller/dashboard');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate price when MRP or age changes
      if (name === 'mrp' || name === 'age') {
        const mrp = name === 'mrp' ? value : updated.mrp;
        const age = name === 'age' ? value : updated.age;
        if (mrp && age) {
          const suggestedPrice = calculateSuggestedPrice(mrp, parseInt(age));
          updated.price = suggestedPrice.toFixed(2);
        }
      }
      
      return updated;
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      setErrors(prev => ({ ...prev, images: 'Maximum 5 images allowed' }));
      return;
    }

    setImages(files);
    setErrors(prev => ({ ...prev, images: '' }));

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index) => {
    const newExisting = existingImages.filter((_, i) => i !== index);
    setExistingImages(newExisting);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.condition) {
      newErrors.condition = 'Please select condition';
    }

    if (!formData.mrp) {
      newErrors.mrp = 'Original MRP is required';
    } else if (parseFloat(formData.mrp) <= 0) {
      newErrors.mrp = 'MRP must be greater than 0';
    }

    if (!formData.age) {
      newErrors.age = 'Please select age of product';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    const totalImages = existingImages.length + images.length;
    if (totalImages < 2) {
      newErrors.images = 'Please have at least 2 images';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const suggestedPrice = calculateSuggestedPrice(formData.mrp, parseInt(formData.age));
      const priceNum = parseFloat(formData.price);
      const minPrice = suggestedPrice * 0.9;
      const maxPrice = suggestedPrice * 1.1;
      
      if (priceNum < minPrice || priceNum > maxPrice) {
        newErrors.price = `Price should be between ₹${minPrice.toFixed(2)} and ₹${maxPrice.toFixed(2)}`;
      }
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

    try {
      // TODO: Replace with actual backend API endpoint
      // const formDataToSend = new FormData();
      // formDataToSend.append('title', formData.title);
      // formDataToSend.append('category', formData.category);
      // formDataToSend.append('condition', formData.condition);
      // formDataToSend.append('mrp', formData.mrp);
      // formDataToSend.append('age', formData.age);
      // formDataToSend.append('description', formData.description);
      // formDataToSend.append('price', formData.price);
      // images.forEach((image, index) => {
      //   formDataToSend.append(`images`, image);
      // });

      // const response = await fetch(`http://localhost:8080/api/seller/update/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('sellerToken')}`
      //   },
      //   body: formDataToSend
      // });

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert('Product updated successfully! Status reset to PENDING for admin review.');
      navigate('/seller/dashboard');
    } catch (error) {
      alert('Failed to update product. Please try again.');
      console.error('Update product error:', error);
    } finally {
      setLoading(false);
    }
  };

  const suggestedPrice = formData.mrp && formData.age 
    ? calculateSuggestedPrice(formData.mrp, parseInt(formData.age))
    : 0;
  const minPrice = suggestedPrice * 0.9;
  const maxPrice = suggestedPrice * 1.1;

  if (fetching) {
    return (
      <div className="edit-product-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">Edit Product</h1>
          <button className="back-btn" onClick={() => navigate('/seller/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Product Information</h2>
            
            <div className="form-group">
              <label htmlFor="title" className="form-label">Product Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-input ${errors.title ? 'input-error' : ''}`}
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category" className="form-label">Category *</label>
                <select
                  id="category"
                  name="category"
                  className={`form-input ${errors.category ? 'input-error' : ''}`}
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="condition" className="form-label">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  className={`form-input ${errors.condition ? 'input-error' : ''}`}
                  value={formData.condition}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                {errors.condition && <span className="error-text">{errors.condition}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description *</label>
              <textarea
                id="description"
                name="description"
                className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
                placeholder="Describe your product in detail (minimum 20 characters)"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                disabled={loading}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Pricing Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mrp" className="form-label">Original MRP (₹) *</label>
                <input
                  type="number"
                  id="mrp"
                  name="mrp"
                  className={`form-input ${errors.mrp ? 'input-error' : ''}`}
                  placeholder="Enter original MRP"
                  value={formData.mrp}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  disabled={loading}
                />
                {errors.mrp && <span className="error-text">{errors.mrp}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="age" className="form-label">Age of Product *</label>
                <select
                  id="age"
                  name="age"
                  className={`form-input ${errors.age ? 'input-error' : ''}`}
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="">Select age</option>
                  {ageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>
            </div>

            {suggestedPrice > 0 && (
              <div className="price-suggestion-box">
                <div className="suggestion-item">
                  <span className="suggestion-label">Suggested Price:</span>
                  <span className="suggestion-value">₹{suggestedPrice.toFixed(2)}</span>
                </div>
                <div className="suggestion-item">
                  <span className="suggestion-label">Recommended Range:</span>
                  <span className="suggestion-range">₹{minPrice.toFixed(2)} – ₹{maxPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="price" className="form-label">Final Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                className={`form-input ${errors.price ? 'input-error' : ''}`}
                placeholder="Enter selling price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
              {suggestedPrice > 0 && !errors.price && (
                <span className="helper-text">
                  Based on MRP and age, suggested price is ₹{suggestedPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Product Images</h2>
            
            {existingImages.length > 0 && (
              <div className="existing-images">
                <p className="existing-images-label">Current Images:</p>
                <div className="image-previews">
                  {existingImages.map((image, index) => (
                    <div key={index} className="image-preview-item existing">
                      <div className="image-placeholder">{image}</div>
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeExistingImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="images" className="form-label">Upload New Images (optional)</label>
              <input
                type="file"
                id="images"
                name="images"
                className="form-input file-input"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={loading}
              />
              {errors.images && <span className="error-text">{errors.images}</span>}
              <span className="helper-text">Upload 2 to 5 product images total</span>
            </div>

            {imagePreviews.length > 0 && (
              <div className="image-previews">
                <p className="new-images-label">New Images:</p>
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/seller/dashboard')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Updating Product...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

