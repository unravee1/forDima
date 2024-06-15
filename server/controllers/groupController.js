import asyncHandler from 'express-async-handler';
import Group from '../models/Group.js';
import User from '../models/User.js';

// @desc    Get all groups
// @route   GET /api/groups
// @access  Public
const getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find().populate('trainer', 'user specialization').populate('members', 'name email');
    res.json(groups);
});

// @desc    Get group by ID
// @route   GET /api/groups/:id
// @access  Public
const getGroupById = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id).populate('trainer', 'user specialization').populate('members', 'name email');
    if (group) {
        res.json(group);
    } else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc    Create new group
// @route   POST /api/groups
// @access  Private/Trainer
const createGroup = asyncHandler(async (req, res) => {
    const { name, description, trainer } = req.body;

    const newGroup = new Group({
        name,
        description,
        trainer,
    });

    const createdGroup = await newGroup.save();
    res.status(201).json(createdGroup);
});

// @desc    Update group
// @route   PUT /api/groups/:id
// @access  Private/Trainer
const updateGroup = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const group = await Group.findById(req.params.id);

    if (group) {
        group.name = name || group.name;
        group.description = description || group.description;

        const updatedGroup = await group.save();
        res.json(updatedGroup);
    } else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc    Delete group
// @route   DELETE /api/groups/:id
// @access  Private/Admin
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

// @desc    Add user to group
// @route   POST /api/groups/:id/addUser
// @access  Private
const addUserToGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);

    if (group) {
        const user = await User.findById(req.body.userId);

        if (user) {
            group.members.push(user);
            await group.save();
            res.json({ message: 'User added to group' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc    Remove user from group
// @route   POST /api/groups/:id/removeUser
// @access  Private
const removeUserFromGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);

    if (group) {
        const user = await User.findById(req.body.userId);

        if (user) {
            group.members = group.members.filter(member => member.toString() !== user._id.toString());
            await group.save();
            res.json({ message: 'User removed from group' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } else {
        res.status(404);
        throw new Error('Group not found');
    }
});

export { getGroups, getGroupById, createGroup, updateGroup, deleteGroup, addUserToGroup, removeUserFromGroup };
