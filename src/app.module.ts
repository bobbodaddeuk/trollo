import Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from './board/entities/board.entity';
import { Card } from './card/entities/card.entity';
import { User } from './user/entities/user.entity';
import { Comment } from './comment/entities/comment.entity';
import { ListModule } from './list/list.module';
import { List } from './list/entities/list.entity';

const typeOrmModuleOptions = {
  useFactory: async (
    ConfigService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    username: ConfigService.get('DB_USERNAME'),
    password: ConfigService.get('DB_PASSWORD'),
    host: ConfigService.get('DB_HOST'),
    port: ConfigService.get('DB_PORT'),
    database: ConfigService.get('DB_NAME'),
    entities: [User, Card, Board, List, Comment],
    synchronize: ConfigService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [UserModule, CardModule, BoardModule, ColumnModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
