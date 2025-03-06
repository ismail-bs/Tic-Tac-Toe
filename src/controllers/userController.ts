import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { UserService } from '../services/userService';
const userService = new UserService();

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId;

  try {
    const user = await userService.getUserProfile(userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error getting the user details' });
  }
};

export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.userId;
  try {
    const updatedDoc = await userService.updateUserProfile(userId, req?.body);
    res.status(200).json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the user info' });
  }
};
