require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const Application = require('../models/Application');

const localFallbackUri = 'mongodb://localhost:27017/tghs_ats';
const stages = ['NEW', 'SCREENED', 'INTERVIEW', 'FEEDBACK', 'OFFER', 'JOINED'];

const candidates = [
  { demoKey: 'candidate-arya-demo', fullName: 'Arya Nair', position: 'Demo Frontend Engineer', email: 'arya.nair@demo.invalid', phone: '+91-00000-00001', status: 'INTERVIEW' },
  { demoKey: 'candidate-kabir-demo', fullName: 'Kabir Sen', position: 'Demo Backend Engineer', email: 'kabir.sen@demo.invalid', phone: '+91-00000-00002', status: 'FEEDBACK' },
  { demoKey: 'candidate-mira-demo', fullName: 'Mira Iyer', position: 'Demo Product Designer', email: 'mira.iyer@demo.invalid', phone: '+91-00000-00003', status: 'NEW' },
  { demoKey: 'candidate-dev-demo', fullName: 'Dev Malhotra', position: 'Demo Data Analyst', email: 'dev.malhotra@demo.invalid', phone: '+91-00000-00004', status: 'OFFER' },
  { demoKey: 'candidate-isha-demo', fullName: 'Isha Rao', position: 'Demo Backend Engineer', email: 'isha.rao@demo.invalid', phone: '+91-00000-00005', status: 'JOINED' },
];

const jobs = [
  { demoKey: 'job-frontend-demo', title: 'Demo Frontend Engineer', department: 'Engineering', requirements: ['React', 'JavaScript', 'Accessibility'], status: 'OPEN' },
  { demoKey: 'job-backend-demo', title: 'Demo Backend Engineer', department: 'Engineering', requirements: ['Node.js', 'Express', 'MongoDB'], status: 'OPEN' },
  { demoKey: 'job-designer-demo', title: 'Demo Product Designer', department: 'Product', requirements: ['Figma', 'Research', 'Prototyping'], status: 'OPEN' },
  { demoKey: 'job-analyst-demo', title: 'Demo Data Analyst', department: 'Operations', requirements: ['SQL', 'Reporting', 'Data quality'], status: 'OPEN' },
];

const applications = [
  { demoKey: 'application-arya-frontend-demo', candidateKey: 'candidate-arya-demo', jobKey: 'job-frontend-demo', stage: 'INTERVIEW', outcome: 'ACTIVE' },
  { demoKey: 'application-kabir-backend-demo', candidateKey: 'candidate-kabir-demo', jobKey: 'job-backend-demo', stage: 'FEEDBACK', outcome: 'ACTIVE' },
  { demoKey: 'application-mira-designer-demo', candidateKey: 'candidate-mira-demo', jobKey: 'job-designer-demo', stage: 'NEW', outcome: 'ACTIVE' },
  { demoKey: 'application-dev-analyst-demo', candidateKey: 'candidate-dev-demo', jobKey: 'job-analyst-demo', stage: 'OFFER', outcome: 'ACTIVE' },
  { demoKey: 'application-isha-backend-demo', candidateKey: 'candidate-isha-demo', jobKey: 'job-backend-demo', stage: 'JOINED', outcome: 'HIRED' },
];

function assertDevelopmentLocalDatabase() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Demo seeding requires NODE_ENV=development.');
  }

  const uri = process.env.MONGODB_URI || localFallbackUri;
  let parsed;
  try {
    parsed = new URL(uri);
  } catch {
    throw new Error('Demo seeding requires a valid local MONGODB_URI.');
  }

  const localHosts = new Set(['localhost', '127.0.0.1', '::1']);
  if (!localHosts.has(parsed.hostname) || parsed.pathname.replace(/^\//, '') !== 'tghs_ats') {
    throw new Error('Demo seeding is restricted to the local tghs_ats database.');
  }
  return uri;
}

async function createDemoRecord(Model, demoKey, data, conflictFilter) {
  const existing = await Model.findOne({ demoKey }).select('+demoKey');
  if (existing) {
    if (!existing.isDemo) throw new Error(`Refusing to modify non-demo ${Model.modelName} record.`);
    return { record: existing, created: false };
  }

  const conflicting = await Model.findOne(conflictFilter);
  if (conflicting) {
    throw new Error(`A ${Model.modelName} record already matches demo fixture ${demoKey}; no record was changed.`);
  }

  const record = await Model.create({ ...data, demoKey, isDemo: true });
  return { record, created: true };
}

function stageHistoryFor(stage) {
  const lastStageIndex = stages.indexOf(stage);
  return stages.slice(0, lastStageIndex + 1).map((historyStage, index) => ({
    stage: historyStage,
    changedAt: new Date(Date.now() - (lastStageIndex - index) * 24 * 60 * 60 * 1000),
    note: index === 0 ? 'Demo application created' : undefined,
  }));
}

async function seed() {
  const uri = assertDevelopmentLocalDatabase();
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  const candidateByKey = new Map();
  const jobByKey = new Map();
  let createdCount = 0;

  for (const candidateData of candidates) {
    const { demoKey, ...data } = candidateData;
    const result = await createDemoRecord(Candidate, demoKey, data, { email: data.email });
    candidateByKey.set(demoKey, result.record);
    if (result.created) createdCount += 1;
  }

  for (const jobData of jobs) {
    const { demoKey, ...data } = jobData;
    const result = await createDemoRecord(Job, demoKey, data, {
      title: data.title,
      department: data.department,
    });
    jobByKey.set(demoKey, result.record);
    if (result.created) createdCount += 1;
  }

  for (const applicationData of applications) {
    const { demoKey, candidateKey, jobKey, stage, outcome } = applicationData;
    const candidate = candidateByKey.get(candidateKey);
    const job = jobByKey.get(jobKey);
    const result = await createDemoRecord(Application, demoKey, {
      candidateId: candidate._id,
      jobId: job._id,
      stage,
      outcome,
      stageHistory: stageHistoryFor(stage),
    }, {
      candidateId: candidate._id,
      jobId: job._id,
    });
    if (result.created) createdCount += 1;
  }

  console.log(`Demo seed complete. Created ${createdCount} records; existing demo records were preserved.`);
}

seed()
  .catch((error) => {
    console.error(`Demo seed stopped: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
