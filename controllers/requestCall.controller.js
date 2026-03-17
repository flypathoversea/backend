import RequestCall from '../models/RequestCall.model.js';

/* POST /api/request-call */
export const create = async (req, res) => {
  try {
    const doc = await RequestCall.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, errors });
    }
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* GET /api/admin/request-calls */
export const getAll = async (req, res) => {
  try {
    const docs = await RequestCall.find().sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* PATCH /api/admin/request-calls/:id/status */
export const updateStatus = async (req, res) => {
  try {
    const doc = await RequestCall.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: doc });
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
