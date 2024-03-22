import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { PassportModule } from '@nestjs/passport';
import { Member } from 'src/member/entities/member.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Card, Worker, Member]), PassportModule],
    controllers: [WorkerController],
    providers: [WorkerService],
})
export class WorkerModule { }
