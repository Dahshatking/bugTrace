import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db/connectDB.js';

import authRoutes from './routes/auth.js';
import logRoutes from './routes/logs.js';
import analysisRoutes from './routes/analysis.js';
import recRoutes from './routes/recommendations.js';
import dashRoutes from './routes/dashboard.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: Date.now() }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/recommendations', recRoutes);
app.use('/api/dashboard', dashRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
