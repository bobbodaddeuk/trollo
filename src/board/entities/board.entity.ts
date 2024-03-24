import { Card } from 'src/card/entities/card.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { List } from 'src/list/entities/list.entity';
import { Member } from 'src/member/entities/member.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'boards' })
@Index('boardId', ['boardId'], { unique: true })
export class Board {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', nullable: false })
  boardName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.Board)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Member, (member) => member.board)
  member: Member[];

  @OneToMany(() => List, (list) => list.board)
  list: List[];

  @OneToMany(() => Card, (card) => card.board)
  card: Card[];

  @OneToMany(() => Comment, (comment) => comment.board)
  comment: Comment[];
}
