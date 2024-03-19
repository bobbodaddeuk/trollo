import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card.entity";

@Entity({
    name: 'cardworkers',
})
export class CardWorker {
    @PrimaryGeneratedColumn({ unsigned: true })
    cardworkerId: number;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: CardWorker })
    worker: CardWorker;

    @ManyToOne(() => Card, (card) => card.cardworkers, { onDelete: 'CASCADE' })
    card: Card;
}