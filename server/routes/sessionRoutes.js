import express from 'express';
const router = express.Router();
import { 
    getSessions, 
    getSessionById, 
    createSession, 
    updateSession, 
    deleteSession 
} from '../controllers/sessionController.js';
import { protect, trainer} from '../middleware/authMiddleware.js';

// Маршрут для отримання всіх сесій і створення нової сесії
router.route('/')
    .get(getSessions)
    .post(protect, trainer, createSession);

// Маршрут для отримання сесії за ID, оновлення і видалення сесії
router.route('/:id')
    .get(getSessionById)
    .put(protect, trainer, updateSession)
    .delete(protect, trainer, deleteSession);

export default router;
