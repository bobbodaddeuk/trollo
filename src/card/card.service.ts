import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Card } from './entities/card.entity';
import { Worker } from 'src/worker/entities/worker.entity';
import { List } from 'src/list/entities/list.entity';
import { CardWorker } from 'src/worker/types/worker.type';
import { Member } from 'src/member/entities/member.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
    @InjectRepository(Worker) private readonly workerRepository: Repository<Worker>,
    @InjectRepository(List) private readonly listRepository: Repository<List>,
    @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
  ) { }

  //빈 카드 먼저 생성하기
  async create(boardId: number, listId: number, userId: number) {
    //cards : 해당 리스트의 카드 목록
    const cards = await this.cardRepository.find({ where: { listId } });

    const card = await this.cardRepository.save({ boardId, listId, order: cards.length + 1 });

    const member = await this.memberRepository.findOne({ where: { userId } });
    //카드 만든 사용자 leader로 저장
    await this.workerRepository.save({ cardId: card.cardId, memberId: member.memberId, workerRole: CardWorker.Leader });
    return card;
  }

  //카드 목록 조회
  async findCards(boardId: number, listId: number) {
    const cards = await this.cardRepository.find({
      order: { order: 'ASC' },
      where: { boardId, listId },
      select: {
        cardId: true,
        boardId: true,
        listId: true,
        title: true,
        order: true,
      }
    });

    return cards;
  }

  //카드 상세 조회
  async findCard(cardId: number) {
    const card = await this.cardRepository.find({
      where: { cardId },
      relations: [
        'workers'
      ]
    });

    const worker = await this.workerRepository.find({ where: { cardId } });
    console.log("============해당 카드에 존재하는 작업자들==================");
    console.log(worker);
    console.log("=====================relations=========================");
    console.log(card);
    console.log("============================================================");

    if (_.isNull(card)) {
      throw new NotFoundException('삭제된 카드입니다.');
    }

    if (_.isNil(card)) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }

    return card;
  }

  //카드 수정(내용 추가)
  async update(cardId: number, title: string, content: string, deadline: Date) {
    const card = await this.cardRepository.findOneBy({ cardId });

    if (_.isNil(card)) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }

    await this.cardRepository.update({ cardId }, { title, content, deadline });
    const updatedCard = await this.cardRepository.findOneBy({ cardId });

    return updatedCard;
  }

  //카드 삭제
  async remove(cardId: number) {
    const card = await this.cardRepository.findOneBy({ cardId });

    if (_.isNull(card)) {
      throw new NotFoundException('삭제된 카드입니다.');
    }

    if (_.isNil(card)) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }

    const cards = await this.cardRepository.find({ where: { listId: card.listId } });

    //삭제된 카드 밑에 있는 카드들 order값 1씩 줄이기
    for (let k = card.order + 1; k <= cards.length; k++) {
      await this.cardRepository.update({ listId: card.listId, order: k }, { order: k - 1 });
    }

    await this.cardRepository.delete({ cardId });
    await this.workerRepository.delete({ cardId });

    return card;
  }

  //카드 이동하기
  async moveCard(cardId: number, listOrder: number, cardOrder: number) {
    //card : 옮기려는 카드 / cards : 옮기려는 리스트
    const card = await this.cardRepository.findOneBy({ cardId });
    const cards = await this.cardRepository.find({ where: { listId: listOrder } });

    if (_.isNil(card)) {
      throw new NotFoundException('존재하지 않는 카드입니다.');
    }

    const list = await this.listRepository.findOneBy({ listId: listOrder });

    if (!list) {
      throw new NotFoundException('해당 리스트(칼럼)가 존재하지 않습니다.');
    }

    // 같은 리스트 내에서 카드 순서 이동할 때
    // 다른 리스트로 카드 이동할 때
    //(card.order : 옮기는 카드 순서 / cardOrder: 옮기려는 순서)
    if (card.listId === listOrder) {
      await this.cardRepository.update({ cardId }, { order: cardOrder });

      //카드를 위로 옮길 때
      if (card.order > cardOrder) {
        console.log('============카드 위로 올리기=============');
        //옮긴 카드 순서(cardOrder)부터 하나씩 뒤로 밀기(카드 order값 +1)
        for (let i = cardOrder; i < card.order; i++) {
          //해당 리스트의 i번째 카드 order 1씩 더해서 순서 뒤로 밀기
          const upCard = await this.cardRepository.findOne({ where: { listId: listOrder, order: i } });
          await this.cardRepository.update({ cardId: upCard.cardId }, { order: i + 1 });
        }
      } else {
        //카드를 아래로 옮길 때
        //옮긴 카드 순서(order)부터 하나씩 앞으로 밀기(카드 order값 -1)
        console.log("===============카드 아래로 옮기기================");
        for (let j = cardOrder; j > card.order; j--) {
          //해당 리스트의 j번째 카드 order 1씩 줄여서 순서 앞으로 밀기
          const downCard = await this.cardRepository.findOne({ where: { listId: listOrder, order: j } });

          await this.cardRepository.update({ cardId: downCard.cardId }, { order: j - 1 });
        }
      }

      //다른 리스트의 cardOrder 순서에 카드 넣기
      //card : 옮기려는 카드 / cards : 옮기려는 리스트
    } else {
      //기존 리스트에서 카드 뺀 자리만큼 뒤의 카드들 order 앞으로 가져오기
      const fList = await this.cardRepository.find({ where: { listId: card.listId } });
      console.log('다른 리스트로 옮기기 전의 카드 리스트 정보', card.listId);

      //삭제된 카드 밑에 있는 카드들 order값 1씩 줄이기
      for (let y = card.order + 1; y <= fList.length; y++) {
        const fLCard = await this.cardRepository.findOne({ where: { listId: card.listId, order: y } });
        await this.cardRepository.update({ cardId: fLCard.cardId }, { order: y - 1 });
      }

      //옮기려는 카드의 순서가 해당 칼럼의 가장 마지막 순서보다 큰 경우는 그냥 마지막 순서 +1
      if (cardOrder > cards.length) {
        await this.cardRepository.update({ cardId }, { listId: listOrder, order: cards.length + 1 });
      } else {
        //다른 리스트 중간에 카드 넣기
        for (let z = cardOrder; z <= cards.length; z++) {
          //해당 리스트의 z번째 카드 order 1씩 더해서 순서 뒤로 밀기
          const mCard = await this.cardRepository.findOne({ where: { listId: listOrder, order: z } });
          await this.cardRepository.update({ cardId: mCard.cardId }, { order: z + 1 });
        }
        await this.cardRepository.update({ cardId }, { listId: listOrder, order: cardOrder })
      }
    }

  }

}

