const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db/pool');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: in production restrict to known frontend origins; in dev allow all
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, same-origin)
      if (!origin) return callback(null, true);
      // In dev, allow all. In prod, check allowed list.
      if (process.env.NODE_ENV !== 'production' || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: ${origin} not in ${allowedOrigins.join(', ')}`));
    },
    credentials: true,
  })
);

app.use(express.json());

// Serve product images as static files with 7-day cache (browser + CDN)
app.use(
  '/images',
  express.static(path.join(__dirname, 'public', 'images'), {
    maxAge: '7d',
    immutable: true,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    },
  })
);

// Root route — health check for load balancers + friendly message
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      service: 'ShopZone API',
      status: 'running',
      version: '1.0.0',
      docs: '/api/health',
    },
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ success: true, data: { status: 'ok', database: 'connected' } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database unavailable', detail: err.message });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Categories as a separate mount (avoids conflict with /api/products/:id)
app.get('/api/categories', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json({ success: true, data: { categories: result.rows } });
  } catch (err) {
    next(err);
  }
});

// 404 handler for unknown API routes
app.use('/api', (req, res, next) => {
  // If we reach here, no /api/* route matched
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler — catches async errors, never leaks stack traces
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Error]', req.method, req.originalUrl, '-', err.message);
  if (err.message?.startsWith('CORS blocked')) {
    return res.status(403).json({ success: false, error: err.message });
  }
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
  console.log(`[Server] CORS allowed origins: ${allowedOrigins.join(', ')}`);
});
