import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Card } from 'src/card/entities/card.entity';
import { Board } from 'src/board/entities/board.entity';
import { PassportModule } from '@nestjs/passport';
import { Member } from 'src/member/entities/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, User, Card, Board, Member]),
    PassportModule,
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [TypeOrmModule],
})
export class ListModule {}
