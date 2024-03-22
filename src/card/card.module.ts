import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { PassportModule } from '@nestjs/passport';
import { List } from 'src/list/entities/list.entity';
import { Member } from 'src/member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Worker, List, Member]), PassportModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule { }
