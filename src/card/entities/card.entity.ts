import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CardWorker } from '../types/card.type';
import { List } from '../../list/entities/list.entity'
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@Entity({
    name: 'cards',
})
export class Card {
    @PrimaryGeneratedColumn({ unsigned: true })
    cardId: number;

    @Column({ type: 'int' })
    listId: number;

    @Column({ type: 'int' })
    boardId: number;

    @Column({ type: 'int' })
    userId: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ type: 'date' })
    deadline: Date;

    @Column({ type: 'enum', enum: CardWorker })
    worker: CardWorker;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Comment, (comments) => comments.card, { cascade: true })
    comments: Comment[];

    @ManyToOne(() => List, (list) => list.card)
    list: List;
}
