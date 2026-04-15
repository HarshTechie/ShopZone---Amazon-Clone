const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');
const { sendOrderConfirmationEmail } = require('../utils/email');

// Auth middleware sets req.userId (from JWT or defaults to 1)
router.use(authMiddleware);

// Valid payment methods
const VALID_PAYMENT_METHODS = ['COD', 'UPI', 'CARD'];

// POST /api/orders - Place order (transactional)
router.post('/', async (req, res) => {
  const { shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, payment_method = 'COD' } = req.body;

  // Validate shipping fields
  if (!shipping_name || !shipping_address || !shipping_city || !shipping_state || !shipping_zip) {
    return res.status(400).json({ success: false, error: 'All shipping fields are required' });
  }

  // Validate payment method
  const paymentMethodUpper = payment_method.toUpperCase();
  if (!VALID_PAYMENT_METHODS.includes(paymentMethodUpper)) {
    return res.status(400).json({ success: false, error: 'Invalid payment method. Use COD, UPI, or CARD.' });
  }

  // Determine payment status: UPI/CARD simulate instant payment, COD stays pending
  const paymentStatus = paymentMethodUpper === 'COD' ? 'pending' : 'paid';

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get cart items with product details, lock product rows
    const cartResult = await client.query(
      `SELECT ci.id AS cart_item_id, ci.quantity, p.id AS product_id,
              p.name, p.price, p.stock
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1
       FOR UPDATE OF p`,
      [req.userId]
    );

    if (cartResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    // Validate stock for each item
    for (const item of cartResult.rows) {
      if (item.quantity > item.stock) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          error: `Insufficient stock for "${item.name}". Only ${item.stock} available.`,
        });
      }
    }

    // Calculate total
    const totalAmount = cartResult.rows.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );

    // Create order with payment info
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_name, shipping_address,
                           shipping_city, shipping_state, shipping_zip, payment_method, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [req.userId, Math.round(totalAmount * 100) / 100, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, paymentMethodUpper, paymentStatus]
    );

    const orderId = orderResult.rows[0].id;

    // Create order items and update stock
    for (const item of cartResult.rows) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );

      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    // Clear cart
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.userId]);

    await client.query('COMMIT');

    // Send confirmation email AFTER successful commit
    // Awaited so we get proper logging, but wrapped in try-catch so it never blocks the order response
    const userResult = await pool.query('SELECT email FROM users WHERE id = $1', [req.userId]);
    const userEmail = userResult.rows[0]?.email;

    if (userEmail) {
      console.log(`[Order #${orderId}] Triggering confirmation email to ${userEmail}...`);
      try {
        await sendOrderConfirmationEmail({
          to: userEmail,
          orderId,
          items: cartResult.rows,
          totalAmount: Math.round(totalAmount * 100) / 100,
          shipping: { name: shipping_name, address: shipping_address, city: shipping_city, state: shipping_state, zip: shipping_zip },
          paymentMethod: paymentMethodUpper,
          paymentStatus,
        });
      } catch (emailErr) {
        // Email failure must never affect the order response
        console.error(`[Order #${orderId}] Email send threw unexpectedly:`, emailErr.message);
      }
    } else {
      console.log(`[Order #${orderId}] No email address found for user ${req.userId}, skipping email`);
    }

    res.status(201).json({
      success: true,
      data: {
        order_id: orderId,
        total_amount: Math.round(totalAmount * 100) / 100,
        payment_method: paymentMethodUpper,
        payment_status: paymentStatus,
        status: 'confirmed',
      },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// GET /api/orders — List all orders for current user (order history)
router.get('/', async (req, res) => {
  try {
    const ordersResult = await pool.query(
      `SELECT id, total_amount, payment_method, payment_status, status, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.userId]
    );

    // For each order, fetch its items
    const orders = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        `SELECT oi.quantity, oi.price_at_purchase, p.name,
          (SELECT pi.image_url FROM product_images pi
           WHERE pi.product_id = p.id AND pi.is_primary = true
           LIMIT 1) AS image
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      orders.push({ ...order, items: itemsResult.rows });
    }

    res.json({ success: true, data: { orders } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/orders/:id - Get order details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const orderResult = await pool.query(
      `SELECT id, total_amount, shipping_name, shipping_address,
              shipping_city, shipping_state, shipping_zip,
              payment_method, payment_status, status, created_at
       FROM orders
       WHERE id = $1 AND user_id = $2`,
      [id, req.userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const itemsResult = await pool.query(
      `SELECT oi.quantity, oi.price_at_purchase, p.name,
        (SELECT pi.image_url FROM product_images pi
         WHERE pi.product_id = p.id AND pi.is_primary = true
         LIMIT 1) AS image
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [id]
    );

    const order = orderResult.rows[0];
    order.items = itemsResult.rows;

    res.json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
