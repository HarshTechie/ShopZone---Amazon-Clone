const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

// Auth middleware sets req.userId (from JWT or defaults to 1)
router.use(authMiddleware);

// GET /api/cart - Get all cart items with subtotals and total
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ci.id, ci.product_id, p.name, p.price, p.stock,
        (SELECT pi.image_url FROM product_images pi
         WHERE pi.product_id = p.id AND pi.is_primary = true
         LIMIT 1) AS image,
        ci.quantity,
        (p.price * ci.quantity) AS subtotal
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1
       ORDER BY ci.added_at DESC`,
      [req.userId]
    );

    const items = result.rows;
    const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

    res.json({
      success: true,
      data: {
        items,
        total: Math.round(total * 100) / 100,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, error: 'product_id is required' });
    }

    if (quantity < 1) {
      return res.status(400).json({ success: false, error: 'Quantity must be at least 1' });
    }

    // Check product exists and has stock
    const productResult = await pool.query(
      'SELECT id, stock FROM products WHERE id = $1',
      [product_id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const product = productResult.rows[0];

    // Check if already in cart
    const existingItem = await pool.query(
      'SELECT id, quantity FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [req.userId, product_id]
    );

    let cartItem;

    if (existingItem.rows.length > 0) {
      const newQty = existingItem.rows[0].quantity + quantity;

      if (newQty > product.stock) {
        return res.status(400).json({
          success: false,
          error: `Only ${product.stock} items available (${existingItem.rows[0].quantity} already in cart)`,
        });
      }

      const updateResult = await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING id, product_id, quantity',
        [newQty, existingItem.rows[0].id]
      );
      cartItem = updateResult.rows[0];
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          error: `Only ${product.stock} items available`,
        });
      }

      const insertResult = await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id, product_id, quantity',
        [req.userId, product_id, quantity]
      );
      cartItem = insertResult.rows[0];
    }

    res.status(201).json({ success: true, data: cartItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PUT /api/cart/:id - Update quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, error: 'Quantity must be at least 1' });
    }

    // Check cart item exists and get product stock
    const cartItemResult = await pool.query(
      `SELECT ci.id, ci.product_id, p.stock
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.id = $1 AND ci.user_id = $2`,
      [id, req.userId]
    );

    if (cartItemResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    const { stock } = cartItemResult.rows[0];

    if (quantity > stock) {
      return res.status(400).json({
        success: false,
        error: `Only ${stock} items available`,
      });
    }

    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING id, product_id, quantity',
      [quantity, id]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM cart_items WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    res.json({ success: true, data: { message: 'Item removed' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
