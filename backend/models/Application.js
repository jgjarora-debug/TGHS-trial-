const mongoose = require('mongoose');

const stageHistorySchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'],
    required: true,
  },
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: { type: String, trim: true },
}, { _id: false });

const applicationSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
    index: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
    index: true,
  },
  stage: {
    type: String,
    enum: ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'],
    default: 'NEW',
    required: true,
  },
  outcome: {
    type: String,
    enum: ['ACTIVE', 'HIRED', 'REJECTED', 'WITHDRAWN'],
    default: 'ACTIVE',
    required: true,
  },
  stageHistory: { type: [stageHistorySchema], default: [] },
  isDemo: { type: Boolean, default: false, index: true },
  demoKey: { type: String, unique: true, sparse: true, select: false },
}, { timestamps: true });

applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
