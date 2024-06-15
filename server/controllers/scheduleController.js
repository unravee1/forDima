import asyncHandler from 'express-async-handler';
import Schedule from '../models/Shedule.js';

// @desc    Get class schedule
// @route   GET /api/schedule
// @access  Public
const getSchedule = asyncHandler(async (req, res) => {
  const schedule = await Schedule.find({});
  res.json(schedule);
});

export { getSchedule };
