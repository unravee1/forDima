import express from 'express';
const router = express.Router();
import { createVipPayment, updateVipPaymentStatus } from '../controllers/vipPaymentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/pay').post(protect, createVipPayment);
router.route('/pay/:id').put(protect, updateVipPaymentStatus);

export default router;
