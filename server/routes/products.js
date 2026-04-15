const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET /api/products - List products with optional search & category filter
router.get('/', async (req, res) => {
  try {
    const { search, category_id } = req.query;

    let query = `
      SELECT p.id, p.name, p.price, p.stock, c.name AS category_name,
        (SELECT pi.image_url FROM product_images pi
         WHERE pi.product_id = p.id AND pi.is_primary = true
         LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND p.name ILIKE $${params.length}`;
    }

    if (category_id) {
      params.push(category_id);
      query += ` AND p.category_id = $${params.length}`;
    }

    query += ` ORDER BY p.created_at DESC`;

    const result = await pool.query(query, params);
    res.json({ success: true, data: { products: result.rows } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/products/:id - Get single product with images
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const productResult = await pool.query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const imagesResult = await pool.query(
      `SELECT id, image_url, is_primary, sort_order
       FROM product_images
       WHERE product_id = $1
       ORDER BY sort_order`,
      [id]
    );

    const product = productResult.rows[0];
    product.images = imagesResult.rows;

    res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
