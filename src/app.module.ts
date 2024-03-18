import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleValidationSchema } from './configs/env-validation.config';
import { TypeOrmModuleOptions } from './configs/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    CardModule,
    BoardModule,
    ColumnModule,
    CommentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
