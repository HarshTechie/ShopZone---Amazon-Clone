import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ cartCount, onSearch, user, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Hide search bar on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    navigate('/');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const displayName = user ? user.name.split(' ')[0] : 'Guest';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => { setSearchTerm(''); onSearch(''); }}>
          <span className="logo-text">Shop</span>
          <span className="logo-highlight">Zone</span>
        </Link>

        {/* Hide search bar on login/signup pages */}
        {!isAuthPage && (
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#131921">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
        )}

        <div className="navbar-actions">
          {user ? (
            <div className="nav-link nav-dropdown">
              <span className="nav-link-sub">Hello, {displayName}</span>
              <span className="nav-link-main">Account ▾</span>
              <div className="nav-dropdown-menu">
                <Link to="/orders">My Orders</Link>
                <Link to="/wishlist">My Wishlist</Link>
                <button onClick={onLogout}>Sign Out</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <span className="nav-link-sub">Hello, Guest</span>
              <span className="nav-link-main">Sign In</span>
            </Link>
          )}

          {/* Wishlist icon — only show when logged in */}
          {user && (
            <Link to="/wishlist" className="nav-link nav-icon-link" title="Wishlist">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="nav-link cart-link">
            <div className="cart-icon-wrapper">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span className="cart-badge">{cartCount}</span>
            </div>
            <span className="nav-link-main">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
