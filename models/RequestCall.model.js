import mongoose from 'mongoose';

const requestCallSchema = new mongoose.Schema(
  {
    fullName:    { type: String, required: true, trim: true },
    email:       { type: String, required: true, lowercase: true, trim: true },
    phone:       { type: String, required: true },
    country:     { type: String, required: true },
    visaInterest:{ type: String, enum: ['student', 'work', 'tourist', 'unsure'], required: true },
    message:     { type: String, default: '' },
    preferredTime: { type: String, default: '' },
    status:      { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('RequestCall', requestCallSchema);
