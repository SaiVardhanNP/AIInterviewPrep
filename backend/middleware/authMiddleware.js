import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    const {token}= req.headers;
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await User.findById(decoded.id);
        if(!foundUser) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        req.user = foundUser;
        // console.log(foundUser);
        next();     
    }
    catch (error) {
        console.error('Error in authMiddleware:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    } 
}  

export default protect;