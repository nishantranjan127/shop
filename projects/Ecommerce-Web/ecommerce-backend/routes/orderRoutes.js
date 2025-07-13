const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// Protected routes
router.use(protect);

router.route('/')
  .post(createOrder)
  .get(admin, getOrders);

router.get('/myorders', getMyOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/pay')
  .put(updateOrderToPaid);

router.route('/:id/cancel')
  .put(cancelOrder);

// Admin routes
router.route('/:id/deliver')
  .put(admin, updateOrderToDelivered);

router.route('/:id/status')
  .put(admin, updateOrderStatus);

module.exports = router; 