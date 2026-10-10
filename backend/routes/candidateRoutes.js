const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const levenshtein = require('fast-levenshtein');

// Create a new candidate
router.post('/', async (req, res, next) => {
  try {
    const { fullName, position, email, phone, resumeText } = req.body;
    
    // Check for exact email match duplicate
    const existingCandidate = await Candidate.findOne({ email: email.toLowerCase() });
    
    let isDuplicate = false;
    let matchScore = 0;

    if (existingCandidate) {
      isDuplicate = true;
      matchScore = 100;
    } else {
      // Check for fuzzy name match using Levenshtein distance
      const allCandidates = await Candidate.find({}, 'fullName');
      for (const candidate of allCandidates) {
        const distance = levenshtein.get(fullName.toLowerCase(), candidate.fullName.toLowerCase());
        const maxLength = Math.max(fullName.length, candidate.fullName.length);
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
      email,
      phone,
      resumeText,
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
    const candidates = await Candidate.find();
    res.status(200).json({ success: true, count: candidates.length, data: candidates });
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
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
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
