import { Request, Response } from 'express';
import { GameService } from '../services/gameService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const gameService = new GameService();

// Save Game
export const saveGame = async (req: AuthenticatedRequest, res: Response) => {
  const { board, winner } = req.body;
  const userId = req.user.userId;

  try {
    const savedGame = await gameService.saveGame(userId, board, winner);
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ error: 'Error saving game' });
  }
};

// Get Leaderboard
export const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const leaderboard = await gameService.getLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
};
