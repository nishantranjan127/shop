# Ecommerce Backend API

A full-featured ecommerce backend API built with Node.js, Express, MongoDB, and Stripe integration.

## 🚀 Features

- **User Authentication**: JWT-based authentication with user registration and login
- **Product Management**: CRUD operations for products with categories, reviews, and search
- **Shopping Cart**: Add, update, remove items with real-time stock validation
- **Order Management**: Complete order lifecycle with status tracking
- **Payment Processing**: Stripe integration for secure payments
- **Admin Panel**: Admin-only routes for product and order management
- **Search & Filtering**: Advanced product search with multiple filters
- **Reviews & Ratings**: Product review system with user ratings

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe API
- **Security**: bcryptjs for password hashing
- **Development**: nodemon for auto-reloading

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payment processing)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd ecommerce-backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

### 3. Database Setup

Start MongoDB and seed the database:

```bash
npm run seed
```

This will create:
- Admin user: `admin@example.com` / `admin123`
- Regular user: `john@example.com` / `password123`
- 6 sample products with images

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products (with search/filter)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/reviews` - Add product review (protected)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:productId` - Update cart item (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Mark order as paid (protected)
- `PUT /api/orders/:id/cancel` - Cancel order (protected)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent (protected)
- `POST /api/payments/confirm` - Confirm payment (protected)
- `GET /api/payments/payment-methods` - Get available payment methods (protected)

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Example Usage

### Register a new user
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### Get products with search
```bash
curl "http://localhost:5000/api/products?keyword=wireless&category=electronics&minPrice=50&maxPrice=200"
```

### Add item to cart (with auth token)
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "productId": "product_id_here",
    "quantity": 2
  }'
```

## 🗄️ Database Models

### User
- name, email, password (hashed)
- role (user/admin)
- address, phone, avatar
- timestamps

### Product
- name, description, price, category
- images, brand, stock, SKU
- rating, reviews, features
- discount, shipping info
- timestamps

### Cart
- user reference
- items array (product, quantity, price)
- total, totalItems
- timestamps

### Order
- user reference
- orderItems array
- shipping address
- payment info
- status, tracking
- timestamps

## 🔧 Development

### Project Structure
```
ecommerce-backend/
├── config/
│   ├── default.env
│   └── seedData.js
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── paymentController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── paymentRoutes.js
├── index.js
├── seed.js
└── package.json
```

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes with middleware
- Input validation and sanitization
- Error handling middleware
- CORS configuration

## 💳 Payment Integration

The API integrates with Stripe for payment processing:

1. Create payment intent
2. Process payment on frontend
3. Confirm payment with backend
4. Update order status

## 🚀 Deployment

### Environment Variables
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `STRIPE_SECRET_KEY` - Stripe secret key

### Production Considerations
- Use environment variables for sensitive data
- Set up proper MongoDB connection (Atlas recommended)
- Configure CORS for your frontend domain
- Set up proper logging and monitoring
- Use HTTPS in production

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository. 