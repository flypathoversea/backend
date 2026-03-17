import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorised – no token.' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-password');
    if (!req.admin) throw new Error('Admin not found');
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};
