import express from 'express';
const router = express.Router();
import { getSchedule } from '../controllers/scheduleController.js';

router.route('/').get(getSchedule);

export default router;
