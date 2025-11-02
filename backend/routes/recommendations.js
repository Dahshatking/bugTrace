import express from 'express';
import auth from '../middleware/auth.js';
import { getRecommendations, submitFeedback } from '../controllers/recommendationController.js';

const router = express.Router();

router.get('/:logId', auth, getRecommendations);
router.post('/feedback', auth, submitFeedback);

export default router;
