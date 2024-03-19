import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { List } from 'src/list/entities/list.entity';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { CardWorker } from './cardworkers.entity';

@Entity({
  name: 'cards',
})
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  cardId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'date' })
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.card)
  comment: Comment[];

  @ManyToOne(() => List, (list) => list.card, { onDelete: 'CASCADE' })
  list: List;

  @ManyToOne(() => User, (user) => user.card, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CardWorker, (cardworkers) => cardworkers.card, { cascade: true })
  cardworkers: CardWorker;
}
