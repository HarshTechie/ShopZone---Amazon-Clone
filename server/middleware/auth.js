const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'shopzone-secret-key-2024';

// Warn loudly if using default secret in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.warn('[Auth] ⚠️  JWT_SECRET is not set in production! Using insecure default.');
}

/**
 * Strict auth middleware — returns 401 if no valid token.
 * Used for cart, orders, wishlist routes.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Please sign in to continue' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Session expired. Please sign in again.' });
  }
}

module.exports = { authMiddleware, JWT_SECRET };
