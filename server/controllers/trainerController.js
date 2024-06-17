import asyncHandler from 'express-async-handler';
import Trainer from '../models/Trainer.js';
import User from '../models/User.js';

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Public
const getTrainers = asyncHandler(async (req, res) => {
    const trainers = await User.find({ role: 'trainer' });
    res.json(trainers);
  });
  
  // @desc    Get trainer by ID
  // @route   GET /api/trainers/:id
  // @access  Private
  const getTrainerById = asyncHandler(async (req, res) => {
    const trainer = await User.findById(req.params.id);
    if (trainer) {
      res.json(trainer);
    } else {
      res.status(404);
      throw new Error('Trainer not found');
    }
  });
  

// @desc    Create new trainer
// @route   POST /api/trainers
// @access  Private/Admin
const createTrainer = asyncHandler(async (req, res) => {
    const { user, specialization, experience } = req.body;

    const userExists = await User.findById(user);
    if (!userExists) {
        res.status(400);
        throw new Error('User not found');
    }

    const trainer = new Trainer({
        user,
        specialization,
        experience,
    });

    const createdTrainer = await trainer.save();
    res.status(201).json(createdTrainer);
});

// @desc    Update trainer
// @route   PUT /api/trainers/:id
// @access  Private/Admin
const updateTrainer = asyncHandler(async (req, res) => {
    const { specialization, experience } = req.body;

    const trainer = await Trainer.findById(req.params.id);

    if (trainer) {
        trainer.specialization = specialization || trainer.specialization;
        trainer.experience = experience || trainer.experience;

        const updatedTrainer = await trainer.save();
        res.json(updatedTrainer);
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
});

const updateTrainerProfile = asyncHandler(async (req, res) => {
    const trainer = await User.findById(req.params.id);
  
    if (trainer) {
      trainer.name = req.body.name || trainer.name;
      trainer.email = req.body.email || trainer.email;
      trainer.weight = req.body.weight || trainer.weight;
      trainer.height = req.body.height || trainer.height;
      trainer.info = req.body.info || trainer.info;
      trainer.photo = req.body.photo || trainer.photo;
  
      const updatedTrainer = await trainer.save();
      res.json(updatedTrainer);
    } else {
      res.status(404);
      throw new Error('Trainer not found');
    }
  });

// @desc    Delete trainer
// @route   DELETE /api/trainers/:id
// @access  Private/Admin
const deleteTrainer = asyncHandler(async (req, res) => {
    const trainer = await Trainer.findById(req.params.id);

    if (trainer) {
        await trainer.remove();
        res.json({ message: 'Trainer removed' });
    } else {
        res.status(404);
        throw new Error('Trainer not found');
    }
});

export { getTrainers, getTrainerById, createTrainer, updateTrainer, deleteTrainer, updateTrainerProfile };
