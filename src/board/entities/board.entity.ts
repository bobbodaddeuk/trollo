import { Member } from 'src/member/entities/member.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Index('boardId', ['boardId'], { unique: true })
export class Board {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: true })
  memberId: number;

  @Column({ type: 'int', nullable: true })
  listId: number;

  @Column({ type: 'varchar', nullable: false })
  boardName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (User) => User.board)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Member, (Member) => Member.board, { onDelete: 'CASCADE' })
  member: Member[];

  @OneToMany(() => List, (List) => List.board, { onDelete: 'CASCADE' })
  list: List[];
}
