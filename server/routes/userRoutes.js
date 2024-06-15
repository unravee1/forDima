import express from 'express'
const router = express.Router();

import { updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.put('/profile', protect, updateUserProfile);

export default router;