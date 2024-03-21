import { Comment } from 'src/comment/entities/comment.entity';
import { List } from 'src/list/entities/list.entity';
// import { List } from 'src/list/entities/list.entity';
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

@Entity({ name: 'board' })
@Index('boardId', ['boardId'], { unique: true })
export class Board {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  memberId: number;

  @Column({ type: 'varchar', nullable: false })
  boardName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (User) => User.Board)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Member, (member) => member.board, { onDelete: 'CASCADE' })
  member: Member[];

  @OneToMany(() => List, (List) => List.board, { onDelete: 'CASCADE' })
  list: List[];

  @OneToMany(() => Comment, (comment) => comment.board, { onDelete: 'CASCADE' })
  comment: Comment[];
}
