const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  requirements: [{ type: String }],
  status: { 
    type: String, 
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  },
  isDemo: { type: Boolean, default: false, index: true },
  demoKey: { type: String, unique: true, sparse: true, select: false }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
