import _ from 'lodash';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Card } from './entities/card.entity';
import { Worker } from 'src/card/entities/worker.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    @InjectRepository(Worker) private readonly workerRepository: Repository<Worker>,
  ) { }

  //빈 카드 먼저 생성하기
  async create(boardId: number, listId: number) {
    const order = await this.cardRepository.find({ where: { listId } });
    const n = order.sort((a, b) => a.order - b.order);
    console.log(n);

    //order값 저장 아직 없음
    const card = await this.cardRepository.save({ boardId, listId });
    return card;
  }

  //카드 조회
  async findCard(cardId: number) {
    const card = await this.cardRepository.findOne({
      where: { cardId },
      relations: {
        workers: {
          member: true,
        }
      }
    });

    return card;
  }

  //카드 수정(내용 추가)
  async update(cardId: number, title: string, content: string, deadline: Date) {
    const card = await this.cardRepository.findOneBy({ cardId });

    if (_.isNil(card)) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }

    const updatedCard = await this.cardRepository.update({ cardId }, { title, content, deadline });

    return updatedCard;
  }

  //카드 삭제
  async remove(cardId: number) {
    const card = await this.cardRepository.findOneBy({ cardId });

    if (_.isNil(card)) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }

    //카드, 카드에 해당되어있던 작업자 모두 삭제
    await this.cardRepository.delete({ cardId });
    await this.workerRepository.delete({ cardId });
    return card;
  }

  //카드 이동하기
  async moveCard(cardId: number, listOrder: number, cardOrder: number) {
    const card = await this.cardRepository.findOneBy({ cardId });

    if (_.isNil(card)) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }

    const list = await this.cardRepository.find({ where: { listId: listOrder } });

    if (!list) {
      throw new NotFoundException('해당 리스트(칼럼)가 존재하지 않습니다.');
    }

    // 같은 리스트 내에서 카드 순서 이동할 때
    // 다른 리스트로 카드 이동할 때
    //(card.order : 옮기는 카드 순서 / cardOrder: 옮기려는 순서)
    if (card.listId === listOrder) {
      //카드를 위로 옮길 때
      if (card.order > cardOrder) {
        await this.cardRepository.update({ cardId }, { order: cardOrder });
        //옮긴 카드 순서(cardOrder)부터 하나씩 뒤로 밀기(카드 order값 +1)
        for (let i = cardOrder; i < card.order; i++) {
          //해당 리스트의 i번째 카드 order 1씩 더해서 순서 뒤로 밀기
          await this.cardRepository.update({ listId: listOrder, order: i }, { order: i + 1 });
        }
      } else {
        //카드를 아래로 옮길 때
        await this.cardRepository.update({ cardId }, { order: cardOrder });
        //옮긴 카드 순서(order)부터 하나씩 앞으로 밀기(카드 order값 -1)
        for (let j = cardOrder; j > card.order; j--) {
          //해당 리스트의 j번째 카드 order 1씩 줄여서 순서 앞으로 밀기
          await this.cardRepository.update({ listId: listOrder, order: j }, { order: j - 1 });
        }
      }
    } else {
      //다른 리스트의 cardOrder 순서에 카드 넣기
      await this.cardRepository.update({ cardId }, { listId: listOrder, order: cardOrder })

      //다른 리스트 중간에 카드 넣기
      //기존 리스트에서 카드 뺀 자리만큼 뒤의 카드들 order 앞으로 가져오기
    }

  }

  //작업자 할당
  async addWorker(cardId: number, memberId: number) {
    const worker = await this.workerRepository.save({ cardId, memberId });

    return worker;
  }

  //작업자 삭제
  async deleteWorker(workerId: number) {
    const worker = await this.workerRepository.findOneBy({ workerId });

    await this.workerRepository.delete({ workerId });

    return worker;
  }
}
