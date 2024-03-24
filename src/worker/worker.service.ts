import _ from 'lodash';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Card } from 'src/card/entities/card.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { CardWorker } from './types/worker.type';

@Injectable()
export class WorkerService {
    constructor(
        @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
        @InjectRepository(Worker) private readonly workerRepository: Repository<Worker>,
    ) { }

    //작업자 할당
    async addWorker(cardId: number, memberId: number) {
        const card = await this.cardRepository.findOneBy({ cardId });
        if (_.isNull(card)) {
            throw new NotFoundException('삭제된 카드입니다.');
        }

        if (_.isNil(card)) {
            throw new NotFoundException('존재하지 않는 카드입니다.');
        }

        const [w] = await this.workerRepository.find({ where: { cardId, memberId } });

        if (_.isUndefined(w)) {
            const worker = await this.workerRepository.save({ cardId, memberId, workerRole: CardWorker.Member });

            return worker;

        } else {
            throw new BadRequestException('해당 카드에 이미 추가된 작업자입니다.')
        }
    }

    //작업자 삭제
    async deleteWorker(cardId: number, memberId: number) {
        const card = await this.cardRepository.findOneBy({ cardId });
        if (_.isNull(card)) {
            throw new NotFoundException('삭제된 카드입니다.');
        }

        if (_.isNil(card)) {
            throw new NotFoundException('존재하지 않는 카드입니다.');
        }

        const worker = await this.workerRepository.findOne({ where: { cardId, memberId } })

        if (!worker) {
            throw new BadRequestException('해당 카드에 삭제하려는 작업자가 존재하지 않습니다.');
        }
        await this.workerRepository.delete({ cardId, memberId });

        return worker;
    }
}