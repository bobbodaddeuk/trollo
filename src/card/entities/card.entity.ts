import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { List } from 'src/list/entities/list.entity';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Worker } from 'src/card/entities/worker.entity';

@Entity({
  name: 'cards',
})
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  cardId: number;

  @Column({ type: 'int', nullable: false })
  listId: number;

  @Column({ type: 'int', nullable: false })
  boardId: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'date', nullable: false })
  deadline: Date;

  //카드 순서(한 리스트 내에서 순서)
  @Column()
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
  comment: Comment[];

  @ManyToOne(() => List, (list) => list.card, { onDelete: 'CASCADE' })
  list: List;

  @ManyToOne(() => User, (user) => user.card, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Worker, (workers) => workers.card, { cascade: true })
  workers: Worker[];
}
