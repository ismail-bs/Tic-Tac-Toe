import { Game } from '../entities/game';
import { User } from '../entities/user';
import { AppDataSource } from '../utils/db';

export class GameService {
  private gameRepository = AppDataSource.getRepository(Game);
  private userRepository = AppDataSource.getRepository(User);

  // Save Game
  async saveGame(userId: number, board: any, winner: string): Promise<Game> {
    // Retrieve the User entity
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Create a new Game entity
    const game = this.gameRepository.create({
      user, // Assign the full User object
      board,
      winner,
    });

    return await this.gameRepository.save(game);
  }

  // Get Leaderboard
  async getLeaderboard() {
    return await this.gameRepository
      .createQueryBuilder('game')
      .select('game.winner, COUNT(game.winner) AS count')
      .groupBy('game.winner')
      .orderBy('count', 'DESC')
      .getRawMany();
  }
}
