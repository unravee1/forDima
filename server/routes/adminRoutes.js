import express from 'express';
const router = express.Router();
import {
  getUsers,
  updateUserRole,
  getGroups,
  createGroup,
  deleteGroup,
  getCourses,
  createCourse,
  deleteCourse,
  getPayments
} from '../controllers/adminController.js';
import { protect, admin, trainerOrAdmin } from '../middleware/authMiddleware.js';

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id/role').put(protect, admin, updateUserRole);
router.route('/groups').get(protect, trainerOrAdmin, getGroups).post(protect, trainerOrAdmin, createGroup);
router.route('/groups/:id').delete(protect, trainerOrAdmin, deleteGroup);
router.route('/courses').get(protect, trainerOrAdmin, getCourses).post(protect, trainerOrAdmin, createCourse);
router.route('/courses/:id').delete(protect, trainerOrAdmin, deleteCourse);
router.route('/payments').get(protect, admin, getPayments);

export default router;
