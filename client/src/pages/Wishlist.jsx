import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist, addToCart, getImageUrl } from '../api';
import { formatPrice } from '../utils/formatPrice';

function Wishlist({ onCartUpdate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await getWishlist();
      setItems(res.data.data.items);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    }
  };

  const handleMoveToCart = async (item) => {
    try {
      await addToCart(item.product_id);
      await removeFromWishlist(item.id);
      setItems(items.filter((i) => i.id !== item.id));
      onCartUpdate();
      setMessage('Moved to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add to cart';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading wishlist...</div>;

  return (
    <div className="wishlist-page">
      {message && (
        <div className={`toast ${message.includes('Failed') || message.includes('Only') ? 'toast-error' : 'toast-success'}`}>
          {message}
        </div>
      )}

      <div className="wishlist-container">
        <h1>My Wishlist ({items.length} items)</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <h2>Your wishlist is empty</h2>
            <p>Save products you love for later.</p>
            <Link to="/" className="btn btn-buy-now">Browse Products</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map((item) => (
              <div key={item.id} className="wishlist-item">
                <Link to={`/product/${item.product_id}`}>
                  <img
                    src={getImageUrl(item.primary_image)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.src = 'https://placehold.co/200x200?text=No+Image'; }}
                  />
                </Link>
                <div className="wishlist-item-info">
                  <Link to={`/product/${item.product_id}`} className="wishlist-item-name">
                    {item.name}
                  </Link>
                  <p className="wishlist-item-price">{formatPrice(item.price)}</p>
                  <p className={item.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                    {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div className="wishlist-item-actions">
                    <button
                      className="btn btn-add-to-cart"
                      onClick={() => handleMoveToCart(item)}
                      disabled={item.stock === 0}
                    >
                      Move to Cart
                    </button>
                    <button className="btn-link" onClick={() => handleRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
