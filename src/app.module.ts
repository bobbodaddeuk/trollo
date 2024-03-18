import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, CardModule, BoardModule, ColumnModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
