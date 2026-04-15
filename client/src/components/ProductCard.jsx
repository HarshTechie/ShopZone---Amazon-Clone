import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { getImageUrl } from '../api';

function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product.id);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) onAddToWishlist(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img
          src={getImageUrl(product.primary_image)}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="240"
          height="240"
          onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=No+Image'; }}
        />
        <button className="wishlist-heart-btn" onClick={handleAddToWishlist} title="Add to Wishlist">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-category">{product.category_name}</p>
        <p className="product-card-price">{formatPrice(product.price)}</p>
        {product.stock > 0 ? (
          <p className="product-card-stock in-stock">In Stock</p>
        ) : (
          <p className="product-card-stock out-of-stock">Out of Stock</p>
        )}
        <button
          className="btn btn-add-to-cart"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
