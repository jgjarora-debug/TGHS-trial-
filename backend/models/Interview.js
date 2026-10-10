const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  interviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  type: { type: String, enum: ['phone', 'video'], required: true },
  videoLink: { type: String },
  location: { type: String },
  metrics: {
    engagementScore: { type: Number, min: 0, max: 100 },
    sentiment: { type: String }
  },
  interviewerFeedback: {
    score: { type: Number, min: 1, max: 5 },
    recommendations: { type: String },
    comments: { type: String }
  },
  status: { 
    type: String, 
    enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
    default: 'SCHEDULED'
  }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
