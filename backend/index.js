require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const candidateRoutes = require('./routes/candidateRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const dbStatus = {
  state: 'disconnected',
  lastError: null,
  connectedAt: null,
};

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tghs_ats';
mongoose.connect(MONGODB_URI).then(() => {
  dbStatus.state = 'connected';
  dbStatus.lastError = null;
  dbStatus.connectedAt = new Date().toISOString();
  console.log('Connected to MongoDB');
}).catch((err) => {
  dbStatus.state = 'error';
  dbStatus.lastError = err.message;
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connecting', () => {
  dbStatus.state = 'connecting';
});

mongoose.connection.on('connected', () => {
  dbStatus.state = 'connected';
  dbStatus.lastError = null;
  dbStatus.connectedAt = new Date().toISOString();
});

mongoose.connection.on('disconnected', () => {
  dbStatus.state = 'disconnected';
});

mongoose.connection.on('error', (err) => {
  dbStatus.state = 'error';
  dbStatus.lastError = err.message;
});

// Health check distinguishes server availability from database readiness.
app.get('/api/health', (req, res) => {
  const readyState = mongoose.connection.readyState;
  const databaseReady = readyState === 1;

  res.status(databaseReady ? 200 : 503).json({
    success: databaseReady,
    backend: {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
    database: {
      ready: databaseReady,
      state: dbStatus.state,
      mongooseReadyState: readyState,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
      connectedAt: dbStatus.connectedAt,
      lastError: dbStatus.lastError,
    },
  });
});

// Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
