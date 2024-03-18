import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  cardId: number;

  @Column({ type: 'varchar', select: true, nullable: true })
  content: string;

  @ManyToOne(() => User, (user) => user.comment, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Card, (card) => card.comment, { onDelete: 'CASCADE' })
  card: Card;
}
