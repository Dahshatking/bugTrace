import express from 'express';
import auth from '../middleware/auth.js';
import {
  analyzeLog,
  getAnalysisByLogId,
  getAnalyses
} from '../controllers/analysisController.js';

const router = express.Router();

// Analyze a given log (by ID or content)
router.post('/', auth, analyzeLog);

// Get analysis results for a specific log
router.get('/log/:logId', auth, getAnalysisByLogId);

// Get all analyses for the current user
router.get('/all', auth, getAnalyses);

export default router;
