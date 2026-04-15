import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getCategories, addToCart, addToWishlist } from '../api';
import ProductCard from '../components/ProductCard';

function Home({ searchTerm, onCartUpdate, user }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounced search: wait 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data.categories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category_id = selectedCategory;

      const res = await getProducts(params);
      setProducts(res.data.data.products);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await addToCart(productId);
      setMessage('Added to cart!');
      onCartUpdate();
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add to cart';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAddToWishlist = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await addToWishlist(productId);
      setMessage('Added to wishlist!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add to wishlist';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="home-page">
      {message && (
        <div className={`toast ${message.includes('Failed') || message.includes('Only') || message.includes('out of stock') || message.includes('already') ? 'toast-error' : 'toast-success'}`}>
          {message}
        </div>
      )}

      <div className="category-filter">
        <button
          className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === String(cat.id) ? 'active' : ''}`}
            onClick={() => setSelectedCategory(String(cat.id))}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {searchTerm && (
        <p className="search-results-text">
          Showing results for "<strong>{searchTerm}</strong>"
        </p>
      )}

      {loading ? (
        <div className="loading"><div className="spinner"></div>Loading products...</div>
      ) : products.length === 0 ? (
        <div className="no-results">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="#565959">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <h2>No products found</h2>
          <p>Try a different search term or browse categories above.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
