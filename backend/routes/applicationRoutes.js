const express = require('express');
const mongoose = require('mongoose');
const Application = require('../models/Application');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');

const router = express.Router();
const STAGES = ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'];
const NEXT_STAGE = {
  NEW: 'SCREENED',
  SCREENED: 'INTERVIEW',
  INTERVIEW: 'FEEDBACK',
  FEEDBACK: 'OFFER',
  OFFER: 'JOINED',
};

const isValidId = (id) => mongoose.isValidObjectId(id);
const populateApplication = (query) => query
  .populate('candidateId', 'fullName email position status')
  .populate('jobId', 'title department status');

router.get('/', async (req, res, next) => {
  try {
    const { candidateId, jobId, stage, outcome } = req.query;
    const filter = {};

    for (const [key, value] of [['candidateId', candidateId], ['jobId', jobId]]) {
      if (value) {
        if (!isValidId(value)) {
          return res.status(400).json({ success: false, message: `Invalid ${key}` });
        }
        filter[key] = value;
      }
    }

    if (stage) {
      if (!STAGES.includes(stage)) {
        return res.status(400).json({ success: false, message: 'Invalid application stage' });
      }
      filter.stage = stage;
    }

    if (outcome) {
      if (!['ACTIVE', 'HIRED', 'REJECTED', 'WITHDRAWN'].includes(outcome)) {
        return res.status(400).json({ success: false, message: 'Invalid application outcome' });
      }
      filter.outcome = outcome;
    }

    const applications = await populateApplication(
      Application.find(filter).sort({ updatedAt: -1 })
    );
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { candidateId, jobId, note, isDemo = false } = req.body;
    if (!isValidId(candidateId) || !isValidId(jobId)) {
      return res.status(400).json({ success: false, message: 'Valid candidateId and jobId are required' });
    }
    if (typeof isDemo !== 'boolean') {
      return res.status(400).json({ success: false, message: 'isDemo must be a boolean' });
    }
    if (note !== undefined && (typeof note !== 'string' || note.length > 500)) {
      return res.status(400).json({ success: false, message: 'Note must be a string of at most 500 characters' });
    }

    const [candidate, job] = await Promise.all([
      Candidate.findById(candidateId),
      Job.findById(jobId),
    ]);
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    if (job.status !== 'OPEN') {
      return res.status(409).json({ success: false, message: 'Cannot apply to a closed job' });
    }
    if (isDemo && process.env.NODE_ENV !== 'development') {
      return res.status(400).json({ success: false, message: 'Demo records can only be created in development' });
    }

    const application = await Application.create({
      candidateId,
      jobId,
      stage: 'NEW',
      outcome: 'ACTIVE',
      stageHistory: [{ stage: 'NEW', note: note?.trim() || 'Application created' }],
      isDemo,
    });
    const populated = await populateApplication(Application.findById(application._id));
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }
    const application = await populateApplication(Application.findById(req.params.id));
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/stage', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }
    const { stage, note } = req.body;
    if (!STAGES.includes(stage)) {
      return res.status(400).json({ success: false, message: 'Invalid application stage' });
    }
    if (note !== undefined && (typeof note !== 'string' || note.length > 500)) {
      return res.status(400).json({ success: false, message: 'Note must be a string of at most 500 characters' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    if (application.outcome !== 'ACTIVE') {
      return res.status(409).json({ success: false, message: 'Only active applications can change stage' });
    }
    if (NEXT_STAGE[application.stage] !== stage) {
      return res.status(409).json({
        success: false,
        message: `Invalid transition from ${application.stage} to ${stage}`,
      });
    }

    application.stage = stage;
    if (stage === 'JOINED') application.outcome = 'HIRED';
    application.stageHistory.push({ stage, note: note?.trim() || undefined });
    await application.save();

    const populated = await populateApplication(Application.findById(application._id));
    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/outcome', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid application ID' });
    }
    const { outcome } = req.body;
    if (!['REJECTED', 'WITHDRAWN'].includes(outcome)) {
      return res.status(400).json({ success: false, message: 'Outcome must be REJECTED or WITHDRAWN' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    if (application.outcome !== 'ACTIVE') {
      return res.status(409).json({ success: false, message: 'Only active applications can change outcome' });
    }

    application.outcome = outcome;
    await application.save();

    const populated = await populateApplication(Application.findById(application._id));
    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
