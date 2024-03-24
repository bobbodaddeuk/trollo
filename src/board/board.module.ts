import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Member } from 'src/member/entities/member.entity';
import { Board } from './entities/board.entity';
import { PassportModule } from '@nestjs/passport';
import { Card } from 'src/card/entities/card.entity';
import { List } from 'src/list/entities/list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Member, Board, List, Card]),
    PassportModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [TypeOrmModule],
})
export class BoardModule {}
