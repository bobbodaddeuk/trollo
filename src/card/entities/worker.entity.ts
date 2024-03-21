import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CardWorker } from '../types/worker.type';
import { Card } from './card.entity';
import { Member } from 'src/member/entities/member.entity';

@Entity({
    name: 'workers',
})
export class Worker {
    @PrimaryGeneratedColumn({ unsigned: true })
    workerId: number;

    @Column()
    cardId: number;

    @Column({ type: 'int', nullable: false })
    memberId: number;

    @Column({ type: 'enum', enum: CardWorker, default: 'Member' })
    workerRole: CardWorker;

    @ManyToOne(() => Member, (member) => member.workers, { onDelete: 'CASCADE' })
    member: Member;

    @ManyToOne(() => Card, (card) => card.workers, { onDelete: 'CASCADE' })
    card: Card;

}