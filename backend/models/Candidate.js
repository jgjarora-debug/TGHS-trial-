const mongoose = require('mongoose');

const factorBreakdownSchema = new mongoose.Schema({
  experience: { type: Number, min: 0, max: 100 },
  skills: { type: Number, min: 0, max: 100 },
  education: { type: Number, min: 0, max: 100 },
  stability: { type: Number, min: 0, max: 100 },
  salary: { type: Number, min: 0, max: 100 },
  geography: { type: Number, min: 0, max: 100 },
  culture: { type: Number, min: 0, max: 100 },
  language: { type: Number, min: 0, max: 100 }
}, { _id: false });

const aiScreeningSchema = new mongoose.Schema({
  qualityScore: { type: Number, min: 0, max: 100 },
  tier: { type: Number, min: 1, max: 4 },
  confidence: { type: Number, min: 0, max: 100 },
  factorBreakdown: factorBreakdownSchema
}, { _id: false });

const duplicateFlagSchema = new mongoose.Schema({
  isDuplicate: { type: Boolean, default: false },
  matchScore: { type: Number, min: 0, max: 100 }
}, { _id: false });

const candidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  resumeText: { type: String },
  status: { 
    type: String, 
    enum: ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'],
    default: 'NEW'
  },
  aiScreening: aiScreeningSchema,
  duplicateFlag: duplicateFlagSchema
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
