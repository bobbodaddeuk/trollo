import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
import { List } from 'src/list/entities/list.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  cardId: number;

  @Column()
  listId: number;

  @Column()
  boardId: number;

  @Column({ type: 'varchar', select: true, nullable: false })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.comment, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Card, (card) => card.comment, { onDelete: 'CASCADE' })
  card: Card;

  @ManyToOne(() => Board, (board) => board.comment, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => List, (list) => list.comment, { onDelete: 'CASCADE' })
  list: List;
}
