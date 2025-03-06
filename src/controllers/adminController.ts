import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

const adminService = new AdminService();

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get user game history
export const getUserHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  try {
    const history = await adminService.getUserHistory(parseInt(userId));
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user history' });
  }
};
