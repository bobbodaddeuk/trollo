import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Member } from 'src/member/entities/member.entity';
import { List } from 'src/list/entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Card, Board, List, Comment, Member]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '12h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
