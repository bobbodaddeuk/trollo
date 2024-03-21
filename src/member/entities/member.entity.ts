import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberGrade } from '../type/grade.type';
import { Board } from 'src/board/entities/board.entity';
import { User } from 'src/user/entities/user.entity';
@Entity({ name: 'member' })
@Index('memberId', ['memberId'], { unique: true })
export class Member {
  @PrimaryGeneratedColumn()
  memberId: number;

  @Column()
  userId: number;

  @Column()
  boardId: number;

  @Column({
    type: 'enum',
    enum: MemberGrade,
    nullable: false,
    default: MemberGrade.INVITED,
  })
  grade: MemberGrade;

  @ManyToOne(() => Board, (Board) => Board.member)
  //@JoinColumn({ name: 'boardId' })
  board: Board;

  @ManyToOne(() => User, (User) => User.member)
  @JoinColumn({ name: 'userId' })
  user: User;
}
