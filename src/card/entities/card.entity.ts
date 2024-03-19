import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CardWorker } from '../types/card.type';
import { List } from 'src/list/entities/list.entity';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity({
  name: 'cards',
})
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  cardId: number;

  @Column({ type: 'int' })
  listId: number;

  @Column({ type: 'int' })
  boardId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ type: 'enum', enum: CardWorker })
  worker: CardWorker;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  comment: Comment[];

  @ManyToOne(() => List, (list) => list.card)
  list: List;

  @ManyToOne(() => User, (user) => user.card)
  user: User;
}
