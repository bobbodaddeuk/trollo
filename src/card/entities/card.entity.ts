import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { List } from 'src/list/entities/list.entity';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { Comment } from 'src/comment/entities/comment.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { Board } from 'src/board/entities/board.entity';

@Entity({
  name: 'cards',
})
export class Card {
  @PrimaryGeneratedColumn()
  cardId: number;

  @Column({ type: 'int', nullable: false })
  listId: number;

  @Column({ type: 'int', nullable: false })
  boardId: number;

  @Column({ type: 'varchar', default: '미정' })
  title: string;

  @Column({ type: 'varchar', default: '미정' })
  content: string;

  @Column({ type: 'date', default: '2024-12-31' })
  deadline: Date;

  //카드 순서(한 리스트 내에서 순서)
  @Column({ type: 'int', default: 1 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  comment: Comment[];

  @OneToMany(() => Worker, (workers) => workers.card, { cascade: true })
  workers: Worker[];

  @ManyToOne(() => List, (List) => List.card, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listId' })
  list: List;

  @ManyToOne(() => Board, (Board) => Board.card, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;
}
