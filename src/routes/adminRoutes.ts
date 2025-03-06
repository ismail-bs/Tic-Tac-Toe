import express from 'express';
import { getAllUsers, getUserHistory } from '../controllers/adminController';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:userId/history', getUserHistory);

export { router as adminRouter };
