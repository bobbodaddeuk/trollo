import Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from './board/entities/board.entity';
import { Card } from './card/entities/card.entity';
import { User } from './user/entities/user.entity';
import { Column } from './column/entities/column.entity';
import { Comment } from './comment/entities/comment.entity';

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
    entities: [User, Card, Board, Column, Comment],
    synchronize: ConfigService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    CardModule,
    BoardModule,
    ColumnModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
