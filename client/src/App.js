import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import OrderHistory from './pages/OrderHistory';
import { getCart } from './api';
import './styles/App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(() => {
    // Initialize from localStorage synchronously
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const fetchCartCount = useCallback(async () => {
    // Only fetch cart if user is logged in (cart requires auth now)
    const token = localStorage.getItem('token');
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const res = await getCart();
      const count = res.data.data.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      // 401 is handled by interceptor; just reset count
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount, user]);

  // Called after login/signup/logout to refresh auth state
  const handleAuthChange = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch { setUser(null); }
    } else {
      setUser(null);
    }
    fetchCartCount();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          cartCount={cartCount}
          onSearch={setSearchTerm}
          user={user}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Home searchTerm={searchTerm} onCartUpdate={fetchCartCount} user={user} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetail onCartUpdate={fetchCartCount} user={user} />}
            />
            <Route
              path="/cart"
              element={<Cart onCartUpdate={fetchCartCount} user={user} />}
            />
            <Route
              path="/checkout"
              element={<Checkout onCartUpdate={fetchCartCount} />}
            />
            <Route
              path="/order-confirmation/:id"
              element={<OrderConfirmation />}
            />
            <Route
              path="/login"
              element={<Login onAuthChange={handleAuthChange} />}
            />
            <Route
              path="/signup"
              element={<Signup onAuthChange={handleAuthChange} />}
            />
            <Route
              path="/wishlist"
              element={<Wishlist onCartUpdate={fetchCartCount} />}
            />
            <Route
              path="/orders"
              element={<OrderHistory />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
