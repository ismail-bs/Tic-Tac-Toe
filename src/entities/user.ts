import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Game } from './game';

@Entity()
@Index('IDX_EMAIL', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // One-to-many relationship with Game
  @OneToMany(() => Game, (game) => game.user)
  games: Game[];

  @Column({ nullable: true })
  preferredBoardSize: string;

  @Column({ nullable: true, type: 'integer' })
  players: number;
}
