const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const auth = require('../middleware/auth');

const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        key_secret: process.env.RAZORPAY_SECRET_KEY || 'secret_placeholder',
    });
};

// Create Order
router.post('/create-order', auth, async (req, res) => {
    try {
        const { amount, purpose, userId } = req.body;

        if (!amount || !purpose) {
            return res.status(400).json({ message: 'Missing required payment information' });
        }

        const razorpay = getRazorpayInstance();
        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_${userId}_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Order creation failed'
        });
    }
});

// Verify Payment
router.post('/verify', auth, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, purpose, userId, amount } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY || 'secret_placeholder')
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Save payment record to database
            // For now, we'll just return success

            res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
                paymentId: razorpay_payment_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Payment verification failed'
        });
    }
});

// Get payment history for a user
router.get('/history', auth, async (req, res) => {
    try {
        // This would typically involve querying the database for payment records
        // For now, we'll just return a placeholder response
        
        res.status(200).json({
            success: true,
            payments: []
        });
        
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch payment history'
        });
    }
});

module.exports = router;