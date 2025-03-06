import { DataSource } from 'typeorm';
import { Game } from '../entities/game';
import { User } from '../entities/user';

// Initialize the DataSource with the necessary configuration
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'password', 
  database: 'tic_tac_toe',
  entities: [Game, User],
  synchronize: true,
  logging: true,
});

// Establish the connection to the database
export const connectToDatabase = async () => {
  try {
    await AppDataSource.initialize(); // Initialize TypeORM connection
    console.log('Connected to the PostgreSQL database successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
