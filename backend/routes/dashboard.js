import express from 'express';
import auth from '../middleware/auth.js';
import { summary, errorTypes, trends, projects } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/summary', auth, summary);
router.get('/error-types', auth, errorTypes);
router.get('/trends', auth, trends);
router.get('/projects', auth, projects);

export default router;
