import asyncHandler from 'express-async-handler';
import Group from '../models/Group.js';
import User from '../models/User.js';

// @desc    Get all groups
// @route   GET /api/groups
// @access  Public
const getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find({}).populate('trainer', 'name');
    res.json(groups);
  });

// @desc    Get group by ID
// @route   GET /api/groups/:id
// @access  Public
const getGroupById = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id).populate('trainer', 'name').populate('members', 'name email');
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
    const { name, date, time } = req.body;
  
    const group = new Group({
      name,
      date,
      time,
      trainer: req.user._id,
    });
  
    const createdGroup = await group.save();
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

const reGroup = asyncHandler(async (req, res) => {
    const { name, date, time } = req.body;
  
    const group = await Group.findById(req.params.id);
  
    if (group) {
      group.name = name;
      group.date = date;
      group.time = time;
  
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

const addMember = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    const group = await Group.findById(req.params.id);
  
    if (user && group) {
      if (group.members.includes(user._id)) {
        res.status(400);
        throw new Error('User already in group');
      }
      group.members.push(user._id);
      await group.save();
      res.json(group);
    } else {
      res.status(404);
      throw new Error('User or Group not found');
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

const getSchedule = asyncHandler(async (req, res) => {
    const pageSize = 7; // One week per page
    const page = Number(req.query.pageNumber) || 1;
  
    const count = await Group.countDocuments({});
    const groups = await Group.find({})
      .sort({ date: 'asc' })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate('trainer', 'name');
  
    res.json({ groups, page, pages: Math.ceil(count / pageSize) });
  });

export { getGroups, getGroupById, createGroup, updateGroup, deleteGroup, addUserToGroup, removeUserFromGroup, reGroup, addMember, getSchedule };
