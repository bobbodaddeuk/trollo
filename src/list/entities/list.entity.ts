// import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'list',
})
export class List {
  @PrimaryGeneratedColumn()
  listId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', select: true, nullable: false })
  title: string;

  @Column({ type: 'int' })
  index: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(() => Card, (card) => card.list)
  card: Card[];

  // @ManyToOne(() => Board, (board) => board.list, { onDelete: 'CASCADE' })
  // board: Board;

  @ManyToOne(() => User, (user) => user.list, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.list)
  comment: Comment[];
}
