import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });
  
  const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  };
  
  const trainer = (req, res, next) => {
    if (req.user && (req.user.role === 'trainer' || req.user.role === 'admin')) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as a trainer or admin');
    }
  };

export { protect, admin, trainer,};
