import express from 'express';
import auth from '../middleware/auth.js';
import {
  uploadLog,
  getLogs,
  getLogById,
  deleteLog,
  updateLog
} from '../controllers/logController.js';

const router = express.Router();

router.post('/upload', auth, uploadLog);
router.get('/', auth, getLogs);
router.get('/:id', auth, getLogById);
router.delete('/:id', auth, deleteLog);
router.put('/:id', auth, updateLog);

export default router;
