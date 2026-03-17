import Application from '../models/Application.model.js';

/* POST /api/applications */
export const create = async (req, res) => {
  try {
    const app = await Application.create(req.body);
    res.status(201).json({ success: true, applicationId: app._id, data: app });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors });
    }
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
