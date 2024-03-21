import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'list',
})
export class List {
  @PrimaryGeneratedColumn()
  listId: number;

  @Column({ type: 'varchar', select: true, nullable: false })
  title: string;

  @Column({ type: 'int' })
  index: number;

  @OneToMany(() => Card, (card) => card.list, { onDelete: 'CASCADE' })
  card: Card[];

  @ManyToOne(() => Board, (board) => board.list)
  board: Board;

  @ManyToOne(() => User, (user) => user.list)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.list, { onDelete: 'CASCADE' })
  comment: Comment[];
}
