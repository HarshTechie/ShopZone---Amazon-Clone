import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem } from '../api';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { formatPrice } from '../utils/formatPrice';

function Cart({ onCartUpdate, user }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      setCartItems(res.data.data.items);
      setTotal(res.data.data.total);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      await updateCartItem(cartItemId, quantity);
      await fetchCart();
      onCartUpdate();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update quantity';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      await fetchCart();
      onCartUpdate();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to remove item';
      setMessage(errorMsg);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div>Loading cart...</div>;

  return (
    <div className="cart-page">
      {message && <div className="toast toast-error">{message}</div>}

      <div className="cart-container">
        <div className="cart-items-section">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <p>Browse products and add them to your cart.</p>
              <button className="btn btn-buy-now" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <p className="cart-price-header">Price</p>
              <div className="cart-items-divider"></div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
              <div className="cart-items-divider"></div>
              <p className="cart-subtotal-text">
                Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items):{' '}
                <strong>{formatPrice(total)}</strong>
              </p>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary-section">
            <OrderSummary items={cartItems} total={total} />
            <button
              className="btn btn-buy-now btn-full-width"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
