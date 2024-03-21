import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Worker } from 'src/card/entities/worker.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Worker]), PassportModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule { }
