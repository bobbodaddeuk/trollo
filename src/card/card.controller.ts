import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '@nestjs/passport';
import { MoveCardDto } from './dto/move-card.dto';
import { AddWorkerDto } from './dto/add-worker.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  //카드 생성하기
  @Post()
  async create() {
    return this.cardService.create();
  }

  //카드 조회
  @Get(':cardId')
  findCard(@Param('cardId') cardId: number) {
    return this.cardService.findCard(cardId);
  }

  //카드 수정하기(카드 내용 추가)
  @Patch(':cardId')
  async update(@Param('cardId') cardId: string, @Body() updateCardDto: UpdateCardDto) {
    await this.cardService.update(
      +cardId,
      updateCardDto.title,
      updateCardDto.content,
      updateCardDto.deadline,);
  }

  //카드 수정하기(카드 작업자 추가)
  @Patch(':cardId/member')
  async addWorker(@Param('cardId') cardId: string, @Body() addWorkerDto: AddWorkerDto) {
    await this.cardService.addWorker(
      +cardId,
      addWorkerDto.name,
      addWorkerDto.worker
    )
  }

  //카드 삭제하기
  @Delete(':cardId')
  async remove(@Param('cardId') cardId: string) {
    await this.cardService.remove(+cardId);
  }

  //카드 이동하기
  @Patch(':cardId')
  async moveCard(@Param('cardId') cardId: string, @Body() moveCardDto: MoveCardDto) {
    await this.cardService.moveCard(+cardId, moveCardDto.order);
  }
}
