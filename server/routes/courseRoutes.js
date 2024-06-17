import express from 'express';
import { createCourse, deleteCourse, getCourses, getCourseById, updateCourse, editCourse } from '../controllers/courseController.js';
import { trainer, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, trainer, createCourse);
router.put('/:id', updateCourse);
router.put('/:id', protect, trainer, editCourse);
router.delete('/:id', deleteCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);

export default router;
