import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
// import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './list/list.module';
import { configModuleValidationSchema } from './configs/env-validation.config';
import { typeOrmModuleOptions } from './configs/database.config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkerModule } from './worker/worker.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    CardModule,
    BoardModule,
    ListModule,
    CommentModule,
    //두 개 사용하려고 추가
    WorkerModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
