import express from 'express';
const router = express.Router();
import { 
    getGroups, 
    getGroupById, 
    createGroup, 
    updateGroup, 
    deleteGroup, 
    addUserToGroup, 
    removeUserFromGroup 
} from '../controllers/groupController.js';
import { protect, admin, trainerOrAdmin } from '../middleware/authMiddleware.js';

// Маршрут для отримання всіх груп і створення нової групи
router.route('/')
    .get(getGroups)
    .post(protect, trainerOrAdmin, createGroup);

// Маршрут для отримання групи за ID, оновлення і видалення групи
router.route('/:id')
    .get(getGroupById)
    .put(protect, trainerOrAdmin, updateGroup)
    .delete(protect, admin, deleteGroup);

// Маршрут для додавання користувача до групи
router.route('/:id/addUser')
    .post(protect, addUserToGroup);

// Маршрут для видалення користувача з групи
router.route('/:id/removeUser')
    .post(protect, removeUserFromGroup);

export default router;
