import { AppDataSource } from '../utils/db';
import { User } from '../entities/user';
import { Game } from '../entities/game';

export class AdminService {
  private userRepository = AppDataSource.getRepository(User);
  private gameRepository = AppDataSource.getRepository(Game);

  // Get all users
  async getAllUsers() {
    return await this.userRepository.find({
      select: ['id', 'email', 'name', 'createdAt'],
    });
  }

  // Get game history for a specific user
  async getUserHistory(userId: number) {
    return await this.gameRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'board', 'winner', 'playedAt'],
      order: { playedAt: 'DESC' },
    });
  }
}
