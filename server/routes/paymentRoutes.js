import express from 'express';
const router = express.Router();
import { upgradeToVIP, purchaseCourse, plusBalance } from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/upgrade').post(protect, upgradeToVIP);
router.route('/purchase-course').post(protect, purchaseCourse);
router.route('/add-balance').post(protect, admin, plusBalance);

export default router;
