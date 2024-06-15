import asyncHandler from 'express-async-handler';
import Session from '../models/Session.js';

// @desc    Get all sessions
// @route   GET /api/sessions
// @access  Public
const getSessions = asyncHandler(async (req, res) => {
    const sessions = await Session.find().populate('group', 'name').populate('participants', 'name');
    res.json(sessions);
});

// @desc    Get session by ID
// @route   GET /api/sessions/:id
// @access  Public
const getSessionById = asyncHandler(async (req, res) => {
    const session = await Session.findById(req.params.id).populate('group', 'name').populate('participants', 'name');
    if (session) {
        res.json(session);
    } else {
        res.status(404);
        throw new Error('Session not found');
    }
});

// @desc    Create new session
// @route   POST /api/sessions
// @access  Private/Trainer
const createSession = asyncHandler(async (req, res) => {
    const { group, date, duration } = req.body;

    const newSession = new Session({
        group,
        date,
        duration,
    });

    const createdSession = await newSession.save();
    res.status(201).json(createdSession);
});

// @desc    Update session
// @route   PUT /api/sessions/:id
// @access  Private/Trainer
const updateSession = asyncHandler(async (req, res) => {
    const { date, duration } = req.body;

    const session = await Session.findById(req.params.id);

    if (session) {
        session.date = date || session.date;
        session.duration = duration || session.duration;

        const updatedSession = await session.save();
        res.json(updatedSession);
    } else {
        res.status(404);
        throw new Error('Session not found');
    }
});

// @desc    Delete session
// @route   DELETE /api/sessions/:id
// @access  Private/Trainer
const deleteSession = asyncHandler(async (req, res) => {
    const session = await Session.findById(req.params.id);

    if (session) {
        await session.remove();
        res.json({ message: 'Session removed' });
    } else {
        res.status(404);
        throw new Error('Session not found');
    }
});

export { getSessions, getSessionById, createSession, updateSession, deleteSession };
