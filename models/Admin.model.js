import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  name:      { type: String, default: 'Admin' },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('Admin', adminSchema);
