import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { PassportModule } from '@nestjs/passport';
import { List } from 'src/list/entities/list.entity';
import { Member } from 'src/member/entities/member.entity';
import { Board } from 'src/board/entities/board.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Worker, List, Member, Board, User]),
    PassportModule,
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [TypeOrmModule],
})
export class CardModule {}
