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
import { protect, admin, } from '../middleware/authMiddleware.js';

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id/role').put(protect, admin, updateUserRole);
router.route('/groups').get(protect, admin, getGroups).post(protect, admin, createGroup);
router.route('/groups/:id').delete(protect, admin, deleteGroup);
router.route('/courses').get(protect, admin, getCourses).post(protect, admin, createCourse);
router.route('/courses/:id').delete(protect, admin, deleteCourse);
router.route('/payments').get(protect, admin, getPayments);

export default router;
