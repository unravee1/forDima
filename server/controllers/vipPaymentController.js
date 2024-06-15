import asyncHandler from 'express-async-handler';
import stripe from 'stripe';
import VipPayment from '../models/VipPayment.js';
import User from '../models/User.js';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create VIP payment
// @route   POST /api/vip/pay
// @access  Private
const createVipPayment = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: amount * 100, // amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
    });

    const vipPayment = await VipPayment.create({
        user: req.user._id,
        amount,
        status: 'pending',
    });

    res.status(201).json({
        clientSecret: paymentIntent.client_secret,
        vipPaymentId: vipPayment._id,
    });
});

// @desc    Update VIP payment status
// @route   PUT /api/vip/pay/:id
// @access  Private
const updateVipPaymentStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const vipPayment = await VipPayment.findById(req.params.id);

    if (vipPayment) {
        vipPayment.status = status;
        vipPayment.updatedAt = Date.now();

        if (status === 'completed') {
            const user = await User.findById(vipPayment.user);
            user.vipStatus = true;
            await user.save();
        }

        await vipPayment.save();
        res.json(vipPayment);
    } else {
        res.status(404);
        throw new Error('VIP payment not found');
    }
});

export { createVipPayment, updateVipPaymentStatus };
