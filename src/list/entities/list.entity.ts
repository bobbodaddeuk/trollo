import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
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

  @Column({ type: 'int' })
  userId: number;

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
}
