import express from 'express';
import auth from '../middleware/auth.js';
import { getUsers, deleteUser, getAllLogs, deleteLog } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', auth, getUsers);
router.delete('/user/:id', auth, deleteUser);
router.get('/logs', auth, getAllLogs);
router.delete('/log/:id', auth, deleteLog);

export default router;
