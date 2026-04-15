import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, placeOrder, getImageUrl } from '../api';
import OrderSummary from '../components/OrderSummary';
import { formatPrice } from '../utils/formatPrice';

function Checkout({ onCartUpdate }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [form, setForm] = useState({
    shipping_name: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_zip: '',
  });

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      const items = res.data.data.items;
      if (items.length === 0) {
        navigate('/cart');
        return;
      }
      setCartItems(items);
      setTotal(res.data.data.total);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitOrder = async () => {
    try {
      const res = await placeOrder({ ...form, payment_method: paymentMethod });
      onCartUpdate();
      navigate(`/order-confirmation/${res.data.data.order_id}`);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to place order';
      setError(errorMsg);
    } finally {
      setPlacing(false);
      setProcessingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side check for empty fields
    for (const [, value] of Object.entries(form)) {
      if (!value.trim()) {
        setError('All shipping fields are required');
        return;
      }
    }

    setPlacing(true);

    // For UPI/CARD: simulate payment processing (1.5s delay)
    if (paymentMethod === 'UPI' || paymentMethod === 'CARD') {
      setProcessingPayment(true);
      setTimeout(() => {
        submitOrder();
      }, 1500);
    } else {
      // COD: place order immediately
      submitOrder();
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading...</div>;

  // Payment processing overlay
  if (processingPayment) {
    return (
      <div className="payment-processing-overlay">
        <div className="payment-processing-card">
          <div className="spinner"></div>
          <h2>Processing Payment...</h2>
          <p>
            {paymentMethod === 'UPI'
              ? 'Verifying UPI payment...'
              : 'Processing card payment...'}
          </p>
          <p className="payment-processing-amount">{formatPrice(total)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form-section">
          <h2>Shipping Address</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="shipping_name">Full Name</label>
              <input
                type="text"
                id="shipping_name"
                name="shipping_name"
                value={form.shipping_name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipping_address">Address</label>
              <input
                type="text"
                id="shipping_address"
                name="shipping_address"
                value={form.shipping_address}
                onChange={handleChange}
                placeholder="123 Main Street, Apt 4"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="shipping_city">City</label>
                <input
                  type="text"
                  id="shipping_city"
                  name="shipping_city"
                  value={form.shipping_city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                />
              </div>
              <div className="form-group">
                <label htmlFor="shipping_state">State</label>
                <input
                  type="text"
                  id="shipping_state"
                  name="shipping_state"
                  value={form.shipping_state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                />
              </div>
              <div className="form-group">
                <label htmlFor="shipping_zip">PIN Code</label>
                <input
                  type="text"
                  id="shipping_zip"
                  name="shipping_zip"
                  value={form.shipping_zip}
                  onChange={handleChange}
                  placeholder="400001"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-option-content">
                  <span className="payment-option-icon">💵</span>
                  <div>
                    <span className="payment-option-title">Cash on Delivery</span>
                    <span className="payment-option-desc">Pay when your order arrives</span>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-option-content">
                  <span className="payment-option-icon">📱</span>
                  <div>
                    <span className="payment-option-title">UPI</span>
                    <span className="payment-option-desc">Pay via Google Pay, PhonePe, Paytm</span>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment_method"
                  value="CARD"
                  checked={paymentMethod === 'CARD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-option-content">
                  <span className="payment-option-icon">💳</span>
                  <div>
                    <span className="payment-option-title">Credit / Debit Card</span>
                    <span className="payment-option-desc">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
              </label>
            </div>

            <h2>Order Review</h2>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.src = 'https://placehold.co/60x60?text=No+Image'; }}
                  />
                  <div className="checkout-item-info">
                    <p className="checkout-item-name">{item.name}</p>
                    <p className="checkout-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="checkout-item-price">{formatPrice(item.subtotal)}</p>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="btn btn-buy-now btn-full-width"
              disabled={placing}
            >
              {placing
                ? 'Placing Order...'
                : paymentMethod === 'COD'
                  ? 'Place Order (Pay on Delivery)'
                  : `Pay ${formatPrice(total)} & Place Order`}
            </button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <OrderSummary items={cartItems} total={total} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
