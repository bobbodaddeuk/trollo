import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../types/user-role.type';
import { Board } from 'src/board/entities/board.entity';
// import { Card } from 'src/card/entities/card.entity';
import { List } from 'src/list/entities/list.entity';
import { Member } from 'src/member/entities/member.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@Entity({
  name: 'users',
})
// { unsigned: true }
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자를 포함해서 8자리 이상으로 입력해야 합니다.',
    },
  )
  @IsNotEmpty({
    message:
      '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자를 포함해서 8자리 이상으로 입력해야 합니다.',
  })
  @Column({ select: false })
  password: string;

  @IsNotEmpty({ message: '이름은 비워 둘 수 없습니다.' })
  @IsString()
  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Customer })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Board, (board) => board.user, { onDelete: 'CASCADE' })
  Board: Board[];

  @OneToMany(() => List, (List) => List.user, { onDelete: 'CASCADE' })
  list: List[];

  // @OneToMany(() => Card, (card) => card.user, { onDelete: 'CASCADE' })
  // card: Card[];

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
  comment: Comment[];

  @OneToMany(() => Member, (member) => member.user, { onDelete: 'CASCADE' })
  member: Member[];
}
