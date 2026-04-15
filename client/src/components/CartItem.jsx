import React from 'react';
import { formatPrice } from '../utils/formatPrice';
import { getImageUrl } from '../api';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <img
        src={getImageUrl(item.image)}
        alt={item.name}
        className="cart-item-image"
        loading="lazy"
        decoding="async"
        onError={(e) => { e.target.src = 'https://placehold.co/150x150?text=No+Image'; }}
      />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
        {item.stock > 0 ? (
          <p className="in-stock">In Stock</p>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
        <div className="cart-item-actions">
          <div className="quantity-selector">
            <label>Qty:</label>
            <select
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
            >
              {[...Array(Math.min(item.stock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <span className="cart-item-divider">|</span>
          <button className="btn-link" onClick={() => onRemove(item.id)}>
            Delete
          </button>
        </div>
      </div>
      <div className="cart-item-subtotal">
        <p className="cart-item-subtotal-label">Subtotal</p>
        <p className="cart-item-subtotal-price">{formatPrice(item.subtotal)}</p>
      </div>
    </div>
  );
}

export default CartItem;
