import express from 'express'
const router = express.Router();

import { updateUserProfile,getUserById,upgradeToVip } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.put('/profile', protect, updateUserProfile);
router.route('/:id').get(protect, getUserById);
router.route('/upgrade-vip').post(protect, upgradeToVip);

export default router;