import express from 'express';
const router = express.Router();
import { 
    getGroups, 
    getGroupById, 
    createGroup, 
    updateGroup, 
    deleteGroup, 
    addUserToGroup, 
    removeUserFromGroup,
    addMember,
    reGroup,
    getSchedule 
} from '../controllers/groupController.js';
import { protect, admin, trainer } from '../middleware/authMiddleware.js';

router.route('/schedule').get(protect, getSchedule);
// Маршрут для отримання всіх груп і створення нової групи
router.route('/')
    .get(getGroups)
    .post(protect, trainer, createGroup);

// Маршрут для отримання групи за ID, оновлення і видалення групи
router.route('/:id')
    .get(getGroupById)
    
    .put(protect, trainer, reGroup)
    .delete(protect, admin, deleteGroup);

// Маршрут для додавання користувача до групи
router.route('/:id/addUser')
    .post(protect, addUserToGroup);

// Маршрут для видалення користувача з групи
router.route('/:id/removeUser')
    .post(protect, removeUserFromGroup);

router.route('/:id/add-member')
    .post(protect, trainer, addMember);

router.route('/schedule').get(protect, getSchedule);

export default router;
