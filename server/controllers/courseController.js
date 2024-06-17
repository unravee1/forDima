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
    const course = await Course.findById(req.params.id).populate('trainer', 'name');
    if (course) {
      res.json(course);
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  });
  
  // @desc    Create a new course
  // @route   POST /api/courses
  // @access  Private/Trainer
  const createCourse = asyncHandler(async (req, res) => {
    const { name, photo, price, shortDescription, extendedDescription } = req.body;
  
    const course = new Course({
      name,
      photo,
      price,
      shortDescription,
      extendedDescription,
      trainer: req.user._id,
    });
  
    const createdCourse = await course.save();
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

const editCourse = asyncHandler(async (req, res) => {
    const { name, photo, price, shortDescription, extendedDescription } = req.body;
  
    const course = await Course.findById(req.params.id);
  
    if (course) {
      course.name = name;
      course.photo = photo;
      course.price = price;
      course.shortDescription = shortDescription;
      course.extendedDescription = extendedDescription;
      course.trainer = req.user._id; // Update the trainer to the current user
  
      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  });

export {deleteCourse,updateCourse,createCourse, getCourseById,getCourses, editCourse}