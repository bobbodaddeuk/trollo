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
import { Card } from 'src/card/entities/card.entity';
import { List } from 'src/list/entities/list.entity';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Customer })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @OneToMany(() => Board, (Board) => board.user)
  //   Board: Board[];

  //   @OneToMany(() => List, (List) => List.user)
  //   List: List[];

  //   @OneToMany(() => Card, (Card) => Card.user)
  //   Card: Card[];

  //   @OneToMany(() => Comment, (Comment) => Comment.user)
  //   Comment: Comment[];
}
