import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
    
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.id);

    if (!foundUser) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protect;
