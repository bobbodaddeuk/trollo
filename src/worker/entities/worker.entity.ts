import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CardWorker } from 'src/worker/types/worker.type';
import { Card } from 'src/card/entities/card.entity';
import { Member } from 'src/member/entities/member.entity';

@Entity({
    name: 'workers',
})
export class Worker {
    @PrimaryGeneratedColumn()
    workerId: number;

    @Column({ type: 'int', nullable: false })
    cardId: number;

    @Column({ type: 'int', nullable: false })
    memberId: number;

    @Column({ type: 'enum', enum: CardWorker, default: CardWorker.Member })
    workerRole: CardWorker;

    @ManyToOne(() => Member, (member) => member.workers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'memberId', referencedColumnName: "memberId" })
    member: Member;

    @ManyToOne(() => Card, (card) => card.worker, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cardId', referencedColumnName: "cardId" })
    card: Card;
}

// export class Worker {
//     @PrimaryGeneratedColumn({ unsigned: true })
//     workerId: number;

//     @Column({ type: 'int', nullable: false })
//     cardId: number;

//     @Column({ type: 'int', nullable: false })
//     memberId: number;

//     @Column({ type: 'enum', enum: CardWorker, default: CardWorker.Member })
//     workerRole: CardWorker;

//     @ManyToOne(() => Member, (member) => member.workers, { onDelete: 'CASCADE' })
//     member: Member;

//     @ManyToOne(() => Card, (card) => card.workers, { onDelete: 'CASCADE' })
//     //@JoinColumn({ name: 'cardId', referencedColumnName: "cardId" })
//     card: Card;
// }