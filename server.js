import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Admin from './models/Admin.model.js';

import authRoutes        from './routes/auth.routes.js';
import applicationRoutes from './routes/application.routes.js';
import adminRoutes       from './routes/admin.routes.js';
import requestCallRoutes from './routes/requestCall.routes.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI    = process.env.MONGODB_URI    || 'mongodb://localhost:27017/visapath';
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL    || 'admin@visapath.com';
const ADMIN_PASS   = process.env.ADMIN_PASSWORD || 'Admin@1234';
const JWT_SECRET   = process.env.JWT_SECRET     || 'visapath_default_secret_key_2025';

/* Make JWT_SECRET available to auth middleware/controllers */
process.env.JWT_SECRET     = JWT_SECRET;
process.env.ADMIN_EMAIL    = ADMIN_EMAIL;
process.env.ADMIN_PASSWORD = ADMIN_PASS;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth',         authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin',        adminRoutes);
app.use('/api/request-call', requestCallRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'OK' }));

async function seedAdmin() {
  try {
    const exists = await Admin.findOne({ email: ADMIN_EMAIL });
    if (!exists) {
      await Admin.create({ name: 'Super Admin', email: ADMIN_EMAIL, password: ADMIN_PASS });
      console.log('Admin created ->', ADMIN_EMAIL);
    } else {
      console.log('Admin exists  ->', ADMIN_EMAIL);
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedAdmin();
    app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
  })
  .catch((err) => {
    console.error('MongoDB error:', err.message);
    process.exit(1);
  });
