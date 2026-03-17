import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8h' });

/* POST /api/auth/login */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required.' });

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    res.json({
      success: true,
      token: signToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* POST /api/auth/seed  – run once to create the default admin */
export const seed = async (req, res) => {
  try {
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (exists) return res.json({ success: true, message: 'Admin already exists.' });

    await Admin.create({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    res.json({ success: true, message: 'Admin created.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Seed failed.' });
  }
};
