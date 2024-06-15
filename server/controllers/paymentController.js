import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Course from '../models/Course.js';

// @desc    Upgrade to VIP
// @route   POST /api/payments/upgrade
// @access  Private
const upgradeToVIP = asyncHandler(async (req, res) => {
  const { userId, amount } = req.body;

  const user = await User.findById(userId);

  if (user.balance < amount) {
    res.status(400);
    throw new Error('Insufficient balance');
  }

  user.balance -= amount;
  user.vipStatus = true;
  await user.save();

  res.status(200).json({ message: 'Successfully upgraded to VIP', balance: user.balance });
});

// @desc    Purchase a course
// @route   POST /api/payments/purchase-course
// @access  Private
const purchaseCourse = asyncHandler(async (req, res) => {
  const { userId, courseId, price } = req.body;

  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (user.vipStatus) {
    user.courses.push(course._id);
    await user.save();
    res.status(200).json({ message: 'Course accessed successfully (VIP)', balance: user.balance });
  } else {
    if (user.balance < price) {
      res.status(400);
      throw new Error('Insufficient balance');
    }

    user.balance -= price;
    user.courses.push(course._id);
    await user.save();

    res.status(200).json({ message: 'Course purchased successfully', balance: user.balance });
  }
});

// @desc    Add balance to user
// @route   POST /api/payments/add-balance
// @access  Private/Admin
const plusBalance = asyncHandler(async (req, res) => {
  const { userId, amount } = req.body;

  const user = await User.findById(userId);

  user.balance += amount;
  await user.save();

  res.status(200).json({ message: 'Balance added successfully', balance: user.balance });
});



export {plusBalance, purchaseCourse, upgradeToVIP}
