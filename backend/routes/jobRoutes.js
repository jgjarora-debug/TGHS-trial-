const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const jobFields = ['title', 'department', 'requirements', 'status'];
const pickJobFields = (body) => Object.fromEntries(
  jobFields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]])
);

// Create a job
router.post('/', async (req, res, next) => {
  try {
    const { isDemo = false } = req.body;
    if (typeof isDemo !== 'boolean' || (isDemo && process.env.NODE_ENV !== 'development')) {
      return res.status(400).json({ success: false, message: 'Demo jobs can only be created in development' });
    }
    const job = await Job.create({ ...pickJobFields(req.body), isDemo });
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
});

// Get all jobs
router.get('/', async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    next(error);
  }
});

// Get job by ID
router.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
});

// Update a job
router.put('/:id', async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, pickJobFields(req.body), {
      returnDocument: 'after',
      runValidators: true
    });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
});

// Delete a job
router.delete('/:id', async (req, res, next) => {
  try {
    const applicationCount = await Application.countDocuments({ jobId: req.params.id });
    if (applicationCount > 0) {
      return res.status(409).json({
        success: false,
        message: `Job has ${applicationCount} application record${applicationCount === 1 ? '' : 's'}; close the job to preserve its history`,
        applicationCount,
      });
    }
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
