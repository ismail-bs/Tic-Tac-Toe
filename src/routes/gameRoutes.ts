import express from 'express';
import { saveGame, getLeaderboard } from '../controllers/gameController';

const router = express.Router();

router.post('/', saveGame);
router.get('/leaderboard', getLeaderboard);

export { router as gameRouter };
