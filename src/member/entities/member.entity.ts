import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberGrade } from '../type/grade.type';
import { Board } from 'src/board/entities/board.entity';
import { User } from 'src/user/entities/user.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Entity({ name: 'members' })
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
    default: MemberGrade.INVITED,
  })
  grade: MemberGrade;

  @ManyToOne(() => Board, (Board) => Board.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @ManyToOne(() => User, (User) => User.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Worker, (workers) => workers.member, { cascade: true })
  workers: Worker[];
}
