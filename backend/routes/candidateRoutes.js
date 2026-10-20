const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const Application = require('../models/Application');
const levenshtein = require('fast-levenshtein');
const candidateFields = ['fullName', 'position', 'email', 'phone', 'resumeText', 'status'];
const pickCandidateFields = (body) => Object.fromEntries(
  candidateFields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]])
);

// Create a new candidate
router.post('/', async (req, res, next) => {
  try {
    const { fullName, position, email, phone, resumeText, isDemo = false } = req.body;
    if (![fullName, position, email, phone].every((value) => typeof value === 'string' && value.trim())) {
      return res.status(400).json({ success: false, message: 'Full name, position, email, and phone are required' });
    }
    if (typeof isDemo !== 'boolean' || (isDemo && process.env.NODE_ENV !== 'development')) {
      return res.status(400).json({ success: false, message: 'Demo candidates can only be created in development' });
    }
    
    // Check for exact email match duplicate
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required' });
    }
    if (resumeText !== undefined && (typeof resumeText !== 'string' || resumeText.length > 10000)) {
      return res.status(400).json({ success: false, message: 'Resume text must be a string up to 10000 characters' });
    }
    const existingCandidate = await Candidate.findOne({ email: normalizedEmail });
    
    let isDuplicate = false;
    let matchScore = 0;

    if (existingCandidate) {
      isDuplicate = true;
      matchScore = 100;
    } else {
      // Check for fuzzy name match using Levenshtein distance
      const allCandidates = await Candidate.find({}, 'fullName');
      for (const candidate of allCandidates) {
        const distance = levenshtein.get(fullName.trim().toLowerCase(), candidate.fullName.toLowerCase());
        const maxLength = Math.max(fullName.trim().length, candidate.fullName.length);
        const similarity = ((maxLength - distance) / maxLength) * 100;
        
        if (similarity > 85) { // Threshold for fuzzy match
          isDuplicate = true;
          matchScore = Math.max(matchScore, similarity);
        }
      }
    }

    const candidateData = {
      fullName,
      position,
      email: normalizedEmail,
      phone,
      resumeText,
      isDemo,
      duplicateFlag: {
        isDuplicate,
        matchScore
      }
    };

    const candidate = new Candidate(candidateData);
    await candidate.save();
    
    res.status(201).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
});

// Get all candidates
router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.includeArchived === 'true' ? {} : { archivedAt: null };
    const candidates = await Candidate.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: candidates.length, data: candidates });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/archive', async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $set: { archivedAt: new Date() } },
      { returnDocument: 'after', runValidators: true }
    );
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/restore', async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $set: { archivedAt: null } },
      { returnDocument: 'after', runValidators: true }
    );
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
});

// Get candidate by ID
router.get('/:id', async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
});

// Update candidate
router.put('/:id', async (req, res, next) => {
  try {
    const updates = pickCandidateFields(req.body);
    if (updates.email) {
      updates.email = updates.email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
        return res.status(400).json({ success: false, message: 'A valid email address is required' });
      }
    }
    if (updates.resumeText !== undefined && (typeof updates.resumeText !== 'string' || updates.resumeText.length > 10000)) {
      return res.status(400).json({ success: false, message: 'Resume text must be a string up to 10000 characters' });
    }
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, updates, {
      returnDocument: 'after',
      runValidators: true
    });
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    next(error);
  }
});

// Delete candidate
router.delete('/:id', async (req, res, next) => {
  try {
    const applicationCount = await Application.countDocuments({ candidateId: req.params.id });
    if (applicationCount > 0) {
      return res.status(409).json({
        success: false,
        message: `Candidate has ${applicationCount} application record${applicationCount === 1 ? '' : 's'}; archive the candidate to preserve its history`,
        applicationCount,
      });
    }
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
