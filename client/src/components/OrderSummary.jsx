import React from 'react';
import { formatPrice } from '../utils/formatPrice';

function OrderSummary({ items, total }) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="order-summary-row">
        <span>Items ({itemCount}):</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="order-summary-row">
        <span>Shipping:</span>
        <span className="free-shipping">FREE</span>
      </div>
      <div className="order-summary-divider"></div>
      <div className="order-summary-row order-summary-total">
        <span>Order Total:</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
