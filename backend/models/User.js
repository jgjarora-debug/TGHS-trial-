const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Manager', 'Recruiter', 'Viewer'],
    required: true 
  },
  permissions: {
    viewCandidates: { type: Boolean, default: false },
    createCandidates: { type: Boolean, default: false },
    scheduleInterviews: { type: Boolean, default: false },
    generateReports: { type: Boolean, default: false },
    manageUsers: { type: Boolean, default: false }
  },
  status: { 
    type: String, 
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
