import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from'../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public

 const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;
    user.weight = req.body.weight || user.weight;
    user.photo = req.body.photo || user.photo;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      weight: updatedUser.weight,
      photo: updatedUser.photo,
      role: updatedUser.role,
      vipStatus: updatedUser.vipStatus,
      balance: updatedUser.balance,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


export { updateUserProfile };