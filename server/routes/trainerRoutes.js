import express from 'express';
const router = express.Router();
import { 
    getTrainers, 
    getTrainerById, 
    createTrainer, 
    updateTrainer, 
    deleteTrainer 
} from '../controllers/trainerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Маршрут для отримання всіх тренерів і створення нового тренера
router.route('/')
    .get(getTrainers)
    .post(protect, admin, createTrainer);

// Маршрут для отримання тренера за ID, оновлення і видалення тренера
router.route('/:id')
    .get(getTrainerById)
    .put(protect, admin, updateTrainer)
    .delete(protect, admin, deleteTrainer);

export default router;
