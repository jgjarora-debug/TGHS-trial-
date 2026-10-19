const express = require('express');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const Application = require('../models/Application');

const router = express.Router();

router.get('/summary', async (req, res, next) => {
  try {
    const [candidateCount, openJobCount, applicationCount, activeApplicationCount, hiredCount, stageGroups] = await Promise.all([
      Candidate.countDocuments(),
      Job.countDocuments({ status: 'OPEN' }),
      Application.countDocuments(),
      Application.countDocuments({ outcome: 'ACTIVE' }),
      Application.countDocuments({ outcome: 'HIRED' }),
      Application.aggregate([
        { $group: { _id: '$stage', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const stages = ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'];
    const stageCounts = Object.fromEntries(stages.map((stage) => [stage, 0]));
    for (const group of stageGroups) stageCounts[group._id] = group.count;

    res.status(200).json({
      success: true,
      data: {
        candidateCount,
        openJobCount,
        applicationCount,
        activeApplicationCount,
        hiredCount,
        stageCounts,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
