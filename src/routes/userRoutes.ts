import express from 'express';
import { updateUserProfile, getUserProfile } from '../controllers/userController';

const router = express.Router();

router.get('/me', getUserProfile);
router.patch('/', updateUserProfile);

export { router as userRouter };
