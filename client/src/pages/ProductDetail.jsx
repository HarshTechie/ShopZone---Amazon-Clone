import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart, addToWishlist } from '../api';
import ImageCarousel from '../components/ImageCarousel';
import { formatPrice } from '../utils/formatPrice';

function ProductDetail({ onCartUpdate, user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await getProduct(id);
      setProduct(res.data.data);
    } catch (err) {
      console.error('Failed to fetch product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await addToCart(product.id);
      setMessage('Added to cart!');
      onCartUpdate();
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add to cart';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleBuyNow = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await addToCart(product.id);
      onCartUpdate();
      navigate('/cart');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add to cart';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await addToWishlist(product.id);
      setMessage('Added to wishlist!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add to wishlist';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading product...</div>;
  if (!product) return <div className="no-results">Product not found.</div>;

  const specs = product.specifications || {};

  return (
    <div className="product-detail-page">
      {message && (
        <div className={`toast ${message.includes('Failed') || message.includes('Only') || message.includes('out of stock') ? 'toast-error' : 'toast-success'}`}>
          {message}
        </div>
      )}

      <div className="product-detail-container">
        <div className="product-detail-images">
          <ImageCarousel images={product.images} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-category">{product.category_name}</p>
          <div className="product-detail-price">{formatPrice(product.price)}</div>
          <p className="product-detail-shipping">FREE Shipping</p>

          {product.stock > 0 ? (
            <p className="in-stock">In Stock ({product.stock} available)</p>
          ) : (
            <p className="out-of-stock">Currently Unavailable</p>
          )}

          <div className="product-detail-buttons">
            <button
              className="btn btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-buy-now"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
            <button className="btn btn-wishlist" onClick={handleAddToWishlist}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: 6, verticalAlign: 'middle'}}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Add to Wishlist
            </button>
          </div>
        </div>

        <div className="product-detail-bottom">
          <div className="product-detail-description">
            <h2>About this item</h2>
            <ul className="product-bullets">
              {product.description.split('\n').filter(line => line.trim()).map((line, i) => (
                <li key={i}>{line.replace(/^[•-]\s*/, '')}</li>
              ))}
            </ul>
          </div>

          {Object.keys(specs).length > 0 && (
            <div className="product-detail-specs">
              <h2>Specifications</h2>
              <table className="specs-table">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
