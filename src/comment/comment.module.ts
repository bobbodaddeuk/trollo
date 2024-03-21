import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserModule } from 'src/user/user.module';
import { CardModule } from 'src/card/card.module';
import { ListModule } from 'src/list/list.module';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [
    UserModule,
    CardModule,
    ListModule,
    BoardModule,
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
