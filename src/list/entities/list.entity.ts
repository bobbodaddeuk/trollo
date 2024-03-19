import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
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

  // 이미 아래쪽에서 User와 관계를 정의했으므로 userId 컬럼을 만들어줄 필요가 없음
  // @Column({ type: 'int' })
  // userId: number;

  @Column({ type: 'int' })
  boardId: number;

  @Column({ type: 'varchar', select: true, nullable: false })
  title: string;

  @Column({ type: 'int' })
  index: number;

  @OneToMany(() => Card, (card) => card.list)
  card: Card[];

  @ManyToOne(() => Board, (board) => board.list, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => User, (user) => user.list, { onDelete: 'CASCADE' })
  user: User;
}
