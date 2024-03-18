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

  @ManyToOne(() => User, (user) => user.Comment, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  card: Card;
}
