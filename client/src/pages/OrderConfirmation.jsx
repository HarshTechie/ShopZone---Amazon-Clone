import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder, getImageUrl } from '../api';
import { formatPrice } from '../utils/formatPrice';

function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await getOrder(id);
      setOrder(res.data.data);
    } catch (err) {
      console.error('Failed to fetch order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading order details...</div>;
  if (!order) return <div className="no-results">Order not found.</div>;

  return (
    <div className="order-confirmation-page">
      <div className="order-confirmation-container">
        <div className="order-success-header">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="#067D62">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h1>Order Placed Successfully!</h1>
          <p className="order-id">Order #{order.id}</p>
          <p className="order-date">
            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
        </div>

        <div className="order-details-grid">
          <div className="order-shipping-info">
            <h2>Shipping Address</h2>
            <p>{order.shipping_name}</p>
            <p>{order.shipping_address}</p>
            <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
          </div>

          <div className="order-payment-info">
            <h2>Payment & Summary</h2>
            {order.payment_method && (
              <p>Payment: <strong>{order.payment_method}</strong>
                {' '}<span className={`payment-badge ${order.payment_status}`}>
                  {order.payment_status === 'paid' ? 'Paid' : 'Pay on Delivery'}
                </span>
              </p>
            )}
            <p>Status: <span className="order-status">{order.status}</span></p>
            <p>Total: <strong>{formatPrice(order.total_amount)}</strong></p>
          </div>
        </div>

        <div className="order-items-section">
          <h2>Items Ordered</h2>
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                onError={(e) => { e.target.src = 'https://placehold.co/80x80?text=No+Image'; }}
              />
              <div className="order-item-info">
                <p className="order-item-name">{item.name}</p>
                <p className="order-item-qty">Qty: {item.quantity}</p>
                <p className="order-item-price">{formatPrice(item.price_at_purchase)} each</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/" className="btn btn-buy-now">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
