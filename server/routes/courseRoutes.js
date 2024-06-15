import express from 'express';
import { createCourse, deleteCourse, getCourses, getCourseById, updateCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);

export default router;
