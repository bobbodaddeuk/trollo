import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', select: true, nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.comment)
  user: User[];

  @ManyToOne(() => Card, (card) => card.comment)
  card: Card[];
}
