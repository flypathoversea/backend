import Application from '../models/Application.model.js';

/* GET /api/admin/applications */
export const getAll = async (req, res) => {
  try {
    const { status, visaType, search } = req.query;
    const filter = {};
    if (status && status !== 'all')   filter.status   = status;
    if (visaType && visaType !== 'all') filter.visaType = visaType;
    if (search) {
      filter.$or = [
        { firstName:      { $regex: search, $options: 'i' } },
        { lastName:       { $regex: search, $options: 'i' } },
        { email:          { $regex: search, $options: 'i' } },
        { passportNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, stats] = await Promise.all([
      Application.find(filter).sort({ createdAt: -1 }),
      Application.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const counts = { total: 0, pending: 0, under_review: 0, approved: 0, rejected: 0 };
    stats.forEach(({ _id, count }) => {
      counts[_id] = count;
      counts.total += count;
    });

    res.json({ success: true, data, stats: counts });
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* GET /api/admin/applications/:id */
export const getOne = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Not found.' });
    res.json({ success: true, data: app });
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* PATCH /api/admin/applications/:id/status */
export const updateStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!app) return res.status(404).json({ success: false, message: 'Not found.' });
    res.json({ success: true, data: app });
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* DELETE /api/admin/applications/:id */
export const remove = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted.' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
