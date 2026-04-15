import axios from 'axios';

// Use REACT_APP_API_URL in production (set in Vercel env vars)
// Falls back to local dev server for local development
const SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${SERVER_URL}/api`,
  timeout: 30000, // 30s — prevents frontend hangs if backend is slow/down
});

// Convert a local image path (e.g. /images/foo.jpg) to a full URL
// In production, images are served from the Render backend at SERVER_URL
export const getImageUrl = (path) => {
  if (!path) return 'https://placehold.co/400x400?text=No+Image';
  if (path.startsWith('http')) return path; // already a full URL
  return `${SERVER_URL}${path}`;
};

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — clear stale token, let calling code handle redirect
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);

// Products (public — no auth needed)
export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const getCategories = () => API.get('/categories');

// Cart (requires auth)
export const getCart = () => API.get('/cart');
export const addToCart = (product_id, quantity = 1) =>
  API.post('/cart', { product_id, quantity });
export const updateCartItem = (id, quantity) =>
  API.put(`/cart/${id}`, { quantity });
export const removeCartItem = (id) => API.delete(`/cart/${id}`);

// Orders (requires auth)
export const placeOrder = (shippingData) => API.post('/orders', shippingData);
export const getOrder = (id) => API.get(`/orders/${id}`);
export const getOrders = () => API.get('/orders');

// Wishlist (requires auth)
export const getWishlist = () => API.get('/wishlist');
export const addToWishlist = (product_id) => API.post('/wishlist', { product_id });
export const removeFromWishlist = (id) => API.delete(`/wishlist/${id}`);
