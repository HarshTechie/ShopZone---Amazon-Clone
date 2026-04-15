# ShopZone

A full-featured e-commerce web application built with React and Node.js/Express, backed by PostgreSQL. Users can browse products, manage a shopping cart and wishlist, and place orders with multiple payment methods.

## Features

- **Product browsing** — search with debounce, category filtering, image carousel on product detail
- **Authentication** — JWT-based signup/login with bcrypt password hashing; 7-day token expiry
- **Shopping cart** — add, update quantity, remove items; stock validation; cart count badge in navbar
- **Wishlist** — save products, move items directly to cart
- **Checkout & orders** — shipping form, payment methods (COD, UPI, Card), transactional order placement with inventory deduction
- **Order confirmation emails** — HTML email via Gmail SMTP sent automatically after purchase
- **Order history** — view all past orders and individual order details

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router DOM 7, Axios |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Email | Nodemailer (Gmail SMTP) |

## Project Structure

```
ShopZone/
├── client/                  # React frontend
│   └── src/
│       ├── api/             # Axios instance with JWT interceptor
│       ├── components/      # Navbar, ProductCard, CartItem, ImageCarousel, OrderSummary
│       ├── pages/           # Home, ProductDetail, Cart, Checkout, OrderConfirmation,
│       │                    # OrderHistory, Wishlist, Login, Signup
│       └── utils/           # formatPrice helper
└── server/                  # Express backend
    ├── db/
    │   ├── pool.js          # PostgreSQL connection pool
    │   └── schema.sql       # Database schema (8 tables)
    └── index.js             # API routes and server entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### 1. Database Setup

```bash
psql -U postgres -c "CREATE DATABASE shopzone;"
psql -U postgres -d shopzone -f server/db/schema.sql
```

### 2. Backend

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/shopzone
JWT_SECRET=your_jwt_secret
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
PORT=5000
```

```bash
node index.js
```

### 3. Frontend

```bash
cd client
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The React app proxies API calls to `http://localhost:5000`.

## API Overview

All endpoints are prefixed with `/api`. Routes marked **Auth** require a `Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | | Register a new user |
| POST | `/auth/login` | | Login and receive JWT |
| GET | `/products` | | List products (`?search=`, `?category_id=`) |
| GET | `/products/:id` | | Single product with images |
| GET | `/categories` | | All categories |
| GET | `/cart` | Yes | Get cart items |
| POST | `/cart` | Yes | Add item to cart |
| PUT | `/cart/:id` | Yes | Update item quantity |
| DELETE | `/cart/:id` | Yes | Remove item from cart |
| POST | `/orders` | Yes | Place an order |
| GET | `/orders` | Yes | Order history |
| GET | `/orders/:id` | Yes | Single order details |
| POST | `/wishlist` | Yes | Add to wishlist |
| GET | `/wishlist` | Yes | Get wishlist |
| DELETE | `/wishlist/:id` | Yes | Remove from wishlist |

## Available Scripts (client)

| Command | Description |
|---------|-------------|
| `npm start` | Start development server at localhost:3000 |
| `npm test` | Run tests in interactive watch mode |
| `npm run build` | Build optimized production bundle to `/build` |
