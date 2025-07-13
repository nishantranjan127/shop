const crypto = require('crypto');

// UPI Payment Controller
// This controller handles UPI-based payments for the Indian market

// @desc    Create UPI payment request
// @route   POST /api/payments/create-upi-payment
// @access  Private
const createUpiPayment = async (req, res) => {
  try {
    const { amount, currency = 'INR', orderId, customerName, customerPhone } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Generate a unique transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create UPI payment request
    const paymentRequest = {
      transactionId,
      orderId,
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      customerName: customerName || req.user.name,
      customerPhone: customerPhone || req.user.phone,
      customerEmail: req.user.email,
      upiId: process.env.MERCHANT_UPI_ID || 'merchant@upi',
      merchantName: process.env.MERCHANT_NAME || 'Ecommerce Store',
      merchantCode: process.env.MERCHANT_CODE || 'ECOM',
      timestamp: new Date().toISOString(),
      status: 'pending',
      userId: req.user._id.toString()
    };

    // Generate UPI deep link
    const upiDeepLink = generateUpiDeepLink(paymentRequest);

    res.json({
      success: true,
      paymentRequest,
      upiDeepLink,
      qrCode: generateUpiQRCode(paymentRequest),
      message: 'UPI payment request created successfully'
    });
  } catch (error) {
    console.error('UPI payment creation error:', error);
    res.status(500).json({ message: 'UPI payment creation failed' });
  }
};

// @desc    Verify UPI payment
// @route   POST /api/payments/verify-upi-payment
// @access  Private
const verifyUpiPayment = async (req, res) => {
  try {
    const { transactionId, upiTransactionId, status } = req.body;

    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // In a real implementation, you would verify with UPI server
    // For now, we'll simulate verification
    const paymentStatus = await verifyPaymentWithUpiServer(transactionId, upiTransactionId);

    if (paymentStatus.success) {
      res.json({
        success: true,
        transactionId,
        upiTransactionId,
        status: 'success',
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('UPI payment verification error:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

// @desc    Get UPI payment status
// @route   GET /api/payments/status/:transactionId
// @access  Private
const getUpiPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // In a real implementation, you would check with UPI server
    // For now, we'll return a simulated status
    const status = await checkPaymentStatus(transactionId);

    res.json({
      transactionId,
      status: status.status,
      amount: status.amount / 100, // Convert from paise
      currency: status.currency,
      timestamp: status.timestamp
    });
  } catch (error) {
    console.error('Payment status error:', error);
    res.status(500).json({ message: 'Failed to get payment status' });
  }
};

// @desc    Get UPI payment methods
// @route   GET /api/payments/payment-methods
// @access  Private
const getUpiPaymentMethods = async (req, res) => {
  try {
    res.json({
      paymentMethods: [
        {
          id: 'upi',
          type: 'upi',
          name: 'UPI (Unified Payments Interface)',
          description: 'Pay using UPI apps like Google Pay, PhonePe, Paytm, etc.',
          supportedApps: [
            'Google Pay',
            'PhonePe',
            'Paytm',
            'BHIM',
            'Amazon Pay',
            'WhatsApp Pay',
            'MobiKwik',
            'Freecharge'
          ],
          icon: '💳',
          isDefault: true
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process UPI refund
// @route   POST /api/payments/refund
// @access  Private/Admin
const processUpiRefund = async (req, res) => {
  try {
    const { transactionId, amount, reason } = req.body;

    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // In a real implementation, you would process refund through UPI
    const refundResult = await processRefundThroughUpi(transactionId, amount, reason);

    if (refundResult.success) {
      res.json({
        success: true,
        refundId: refundResult.refundId,
        amount: refundResult.amount,
        message: 'Refund processed successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: refundResult.message
      });
    }
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ message: 'Refund processing failed' });
  }
};

// Helper function to generate UPI deep link
const generateUpiDeepLink = (paymentRequest) => {
  const params = new URLSearchParams({
    pa: paymentRequest.upiId, // Payee UPI ID
    pn: paymentRequest.merchantName, // Payee name
    tn: `Order ${paymentRequest.orderId}`, // Transaction note
    am: (paymentRequest.amount / 100).toString(), // Amount
    cu: paymentRequest.currency, // Currency
    tr: paymentRequest.transactionId // Transaction reference
  });

  return `upi://pay?${params.toString()}`;
};

// Helper function to generate UPI QR code data
const generateUpiQRCode = (paymentRequest) => {
  const qrData = {
    vpa: paymentRequest.upiId,
    name: paymentRequest.merchantName,
    amount: paymentRequest.amount / 100,
    currency: paymentRequest.currency,
    tn: `Order ${paymentRequest.orderId}`,
    tr: paymentRequest.transactionId
  };

  return JSON.stringify(qrData);
};

// Helper function to verify payment with UPI server (simulated)
const verifyPaymentWithUpiServer = async (transactionId, upiTransactionId) => {
  // In a real implementation, this would make an API call to UPI server
  // For now, we'll simulate a successful verification
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId,
        upiTransactionId,
        status: 'success',
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};

// Helper function to check payment status (simulated)
const checkPaymentStatus = async (transactionId) => {
  // In a real implementation, this would check with UPI server
  // For now, we'll simulate a status check
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transactionId,
        status: 'success',
        amount: 10000, // 100 INR in paise
        currency: 'INR',
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

// Helper function to process refund through UPI (simulated)
const processRefundThroughUpi = async (transactionId, amount, reason) => {
  // In a real implementation, this would process refund through UPI
  // For now, we'll simulate a successful refund
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        refundId: `REF${Date.now()}`,
        amount: amount || 10000,
        reason: reason || 'requested_by_customer',
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};

module.exports = {
  createUpiPayment,
  verifyUpiPayment,
  getUpiPaymentStatus,
  getUpiPaymentMethods,
  processUpiRefund
}; 