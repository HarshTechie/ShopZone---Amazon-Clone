const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

// All wishlist routes require user context
router.use(authMiddleware);

// GET /api/wishlist — Get all wishlist items for current user
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT wi.id, wi.product_id, p.name, p.price, p.stock,
        (SELECT pi.image_url FROM product_images pi
         WHERE pi.product_id = p.id AND pi.is_primary = true
         LIMIT 1) AS primary_image,
        c.name AS category_name
       FROM wishlist_items wi
       JOIN products p ON wi.product_id = p.id
       JOIN categories c ON p.category_id = c.id
       WHERE wi.user_id = $1
       ORDER BY wi.created_at DESC`,
      [req.userId]
    );

    res.json({ success: true, data: { items: result.rows } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/wishlist — Add product to wishlist
router.post('/', async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, error: 'product_id is required' });
    }

    // Check product exists
    const productResult = await pool.query('SELECT id FROM products WHERE id = $1', [product_id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Check if already in wishlist
    const existing = await pool.query(
      'SELECT id FROM wishlist_items WHERE user_id = $1 AND product_id = $2',
      [req.userId, product_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, error: 'Product already in wishlist' });
    }

    const result = await pool.query(
      'INSERT INTO wishlist_items (user_id, product_id) VALUES ($1, $2) RETURNING id, product_id',
      [req.userId, product_id]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/wishlist/:id — Remove item from wishlist
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM wishlist_items WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Wishlist item not found' });
    }

    res.json({ success: true, data: { message: 'Removed from wishlist' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
