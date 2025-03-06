import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { User } from './user';

@Entity()
@Index('IDX_USER_GAME', ['userId'])
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.games, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column('json')
  board: string[][]; // Type this more specifically, assuming a 2D array for the board

  @Column()
  winner: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  playedAt: Date;
}
