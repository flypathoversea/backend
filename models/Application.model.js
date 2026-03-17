import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    visaType: {
      type: String,
      enum: ['student', 'work', 'tourist'],
      required: true,
    },

    /* ── Personal ─────────────────────────── */
    firstName:      { type: String, required: true, trim: true },
    lastName:       { type: String, required: true, trim: true },
    email:          { type: String, required: true, lowercase: true, trim: true },
    phone:          { type: String, required: true },
    dateOfBirth:    { type: Date,   required: true },
    nationality:    { type: String, required: true },
    passportNumber: { type: String, required: true },
    passportExpiry: { type: Date,   required: true },

    /* ── Destination ──────────────────────── */
    destinationCountry: { type: String, required: true },
    intendedArrival:    { type: Date,   required: true },

    /* ── Student ──────────────────────────── */
    universityName: String,
    courseName:     String,
    courseDuration: String,
    studentId:      String,
    fundingSource:  String,

    /* ── Work ─────────────────────────────── */
    employerName:   String,
    jobTitle:       String,
    employmentType: String,
    annualSalary:   String,
    workDuration:   String,

    /* ── Tourist ──────────────────────────── */
    travelPurpose:  String,
    stayDuration:   String,
    accommodation:  String,
    travelBudget:   String,

    /* ── Address ──────────────────────────── */
    address: { type: String, required: true },
    city:    { type: String, required: true },
    state:   { type: String, required: true },
    zipCode: { type: String, required: true },

    /* ── Admin ────────────────────────────── */
    status: {
      type: String,
      enum: ['pending', 'under_review', 'approved', 'rejected'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
