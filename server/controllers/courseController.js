import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';
import User from '../models/User.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({});
    res.json(courses);
  });
  
  // @desc    Get course by ID
  // @route   GET /api/courses/:id
  // @access  Private
  const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  });

 const createCourse = asyncHandler(async (req, res) => {
    const { name, description, trainer } = req.body;

    const newCourse = new Course({
        name,
        description,
        trainer,
    });

    const createdCourse = await newCourse.save();
    res.status(201).json(createdCourse);
});

 const updateCourse = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
        course.name = name || course.name;
        course.description = description || course.description;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

 const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        await course.remove();
        res.json({ message: 'Course removed' });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

export {deleteCourse,updateCourse,createCourse, getCourseById,getCourses}