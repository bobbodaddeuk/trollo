import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grade } from '../type/grade.type';
import { Board } from 'src/board/entities/board.entity';

@Index('memberId', ['memberId'], { unique: true })
export class Member {
  @PrimaryGeneratedColumn()
  memberId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: true })
  boardId: number;

  @Column({
    type: 'enum',
    enum: Grade,
    nullable: false,
    default: Grade.ReadOnly,
  })
  grade: Grade;

  @ManyToOne(() => Board, (Board) => Board.member)
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @ManyToOne(() => User, (User) => User.member)
  @JoinColumn({ name: 'userId' })
  user: User;
}
