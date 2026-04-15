const { Pool } = require('pg');

// Production: uses DATABASE_URL (Neon, Render managed DB, etc.) with SSL required
// Development: falls back to individual env vars with localhost defaults
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Required for Neon, Render, Heroku
    })
  : new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'amazon_clone',
      password: process.env.DB_PASSWORD || '@GOOGLYme2004',
      port: process.env.DB_PORT || 5432,
    });

// Log connection errors so issues surface in Render logs
pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client:', err.message);
});

module.exports = pool;
