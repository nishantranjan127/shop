const express = require('express');
const router = express.Router();
const {
  createUpiPayment,
  verifyUpiPayment,
  getUpiPaymentStatus,
  getUpiPaymentMethods,
  processUpiRefund
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');

// Protected routes
router.use(protect);

// UPI Payment routes
router.post('/create-upi-payment', createUpiPayment);
router.post('/verify-upi-payment', verifyUpiPayment);
router.get('/payment-methods', getUpiPaymentMethods);
router.get('/status/:transactionId', getUpiPaymentStatus);

// Admin routes
router.post('/refund', admin, processUpiRefund);

module.exports = router; 