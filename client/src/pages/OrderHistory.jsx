import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, getImageUrl } from '../api';
import { formatPrice } from '../utils/formatPrice';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.data.orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading orders...</div>;

  return (
    <div className="order-history-page">
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <div className="cart-empty">
          <h2>No orders yet</h2>
          <p>Once you place an order, it will appear here.</p>
          <Link to="/" className="btn btn-buy-now">Start Shopping</Link>
        </div>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <div key={order.id} className="order-history-card">
              <div className="order-history-header">
                <div>
                  <span className="order-history-label">ORDER PLACED</span>
                  <span className="order-history-value">
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                </div>
                <div>
                  <span className="order-history-label">TOTAL</span>
                  <span className="order-history-value">{formatPrice(order.total_amount)}</span>
                </div>
                <div>
                  <span className="order-history-label">ORDER #</span>
                  <Link to={`/order-confirmation/${order.id}`} className="order-history-link">
                    {order.id}
                  </Link>
                </div>
              </div>
              <div className="order-history-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-history-item">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      onError={(e) => { e.target.src = 'https://placehold.co/60x60?text=No+Image'; }}
                    />
                    <div className="order-history-item-info">
                      <p className="order-history-item-name">{item.name}</p>
                      <p className="order-history-item-detail">
                        Qty: {item.quantity} &middot; {formatPrice(item.price_at_purchase)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-history-footer">
                <div className="order-history-badges">
                  <span className={`order-status-badge ${order.status}`}>{order.status}</span>
                  {order.payment_method && (
                    <span className={`payment-badge ${order.payment_status}`}>
                      {order.payment_method} — {order.payment_status === 'paid' ? 'Paid' : 'Pay on Delivery'}
                    </span>
                  )}
                </div>
                <Link to={`/order-confirmation/${order.id}`} className="btn-link">
                  View Order Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
