import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Group from '../models/Group.js';
import Course from '../models/Course.js';
import Payment from '../models/VipPayment.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all groups
// @route   GET /api/admin/groups
// @access  Private/TrainerOrAdmin
const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({}).populate('trainer', 'name');
  res.json(groups);
});

// @desc    Create a new group
// @route   POST /api/admin/groups
// @access  Private/TrainerOrAdmin
const createGroup = asyncHandler(async (req, res) => {
  const { name, description, trainer } = req.body;
  const group = new Group({ name, description, trainer });
  const createdGroup = await group.save();
  res.status(201).json(createdGroup);
});

// @desc    Delete a group
// @route   DELETE /api/admin/groups/:id
// @access  Private/TrainerOrAdmin
const deleteGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (group) {
    await group.remove();
    res.json({ message: 'Group removed' });
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

// @desc    Get all courses
// @route   GET /api/admin/courses
// @access  Private/TrainerOrAdmin
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate('trainer', 'name');
  res.json(courses);
});

// @desc    Create a new course
// @route   POST /api/admin/courses
// @access  Private/TrainerOrAdmin
const createCourse = asyncHandler(async (req, res) => {
  const { name, description, trainer } = req.body;
  const course = new Course({ name, description, trainer });
  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// @desc    Delete a course
// @route   DELETE /api/admin/courses/:id
// @access  Private/TrainerOrAdmin
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

// @desc    Get all payments
// @route   GET /api/admin/payments
// @access  Private/Admin
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({}).populate('user', 'name');
  res.json(payments);
});

export {
  getUsers,
  updateUserRole,
  getGroups,
  createGroup,
  deleteGroup,
  getCourses,
  createCourse,
  deleteCourse,
  getPayments
};
