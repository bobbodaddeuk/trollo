import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  //빈 카드 먼저 생성하기
  //title: string, content: string, deadline: Date
  // async create() {
  //   const card = await this.cardRepository.save({});
  //   return card;
  // }

  // //카드 조회
  // async findCard(cardId: number) {
  //   const card = await this.cardRepository.findOneBy({ cardId });

  //   return card;
  // }

  // //카드 수정(내용 추가)
  // async update(cardId: number, title: string, content: string, deadline: Date) {
  //   const card = await this.cardRepository.findOneBy({ cardId });

  //   const updatedCard = await this.cardRepository.update(
  //     { cardId },
  //     { title, content, deadline },
  //   );

  //   if (card.worker === 'Reader') {
  //     throw new BadRequestException('수정할 권한이 없습니다.');
  //   }

  //   return updatedCard;
  // }

  // //카드 이용자 추가
  // async addWorker(cardId: number, name: string, worker: string) {}

  // async remove(cardId: number) {
  //   const card = await this.cardRepository.findOneBy({ cardId });

  //   if (card.worker === 'Reader') {
  //     throw new BadRequestException('삭제할 권한이 없습니다.');
  //   }

  //   await this.cardRepository.delete({ cardId });
  //   return card;
  // }

  // async moveCard(cardId: number, order: number) {
  //   const card = await this.cardRepository.findOneBy({ cardId });
  //   const card2 = await this.cardRepository.findOne({
  //     where: { cardId: order },
  //   });

  //   if (card.worker === 'Reader') {
  //     throw new BadRequestException('카드 순서를 수정할 권한이 없습니다.');
  //   }

  //   await this.cardRepository.update({ cardId }, card2);
  //   await this.cardRepository.update({ cardId: order }, card);
  // }
}
