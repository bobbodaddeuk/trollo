import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { MoveCardDto } from './dto/move-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { BoardMemberGuard } from 'src/board/guards/board-member.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkersGuard } from 'src/auth/guards/workers.guard';
import { Workers } from 'src/auth/decorators/workers.decorator';
import { CardWorker } from './types/worker.type';
// import { userInfo } from 'src/utils/userInfo.decorator';
// import { User } from 'src/user/entities/user.entity';
import { AddWorkerDto } from './dto/add-worker.dto';

@UseGuards(JwtAuthGuard)
@UseGuards(BoardMemberGuard)
@UseGuards(WorkersGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  //카드 생성하기(빈 카드 해당 boardId, listId에 맞게 만들기)
  //order값 순서대로 넣기 아직 x
  @Post(':boardId/:listId')
  async create(@Param('boardId') boardId: number, @Param('listId') listId: number) {

    return this.cardService.create(boardId, listId);
  }

  //카드 조회(o)
  @Get(':cardId')
  findCard(@Param('cardId') cardId: number) {
    return this.cardService.findCard(cardId);
  }

  //카드 수정하기(카드 내용 추가)(o)
  //카드 생성했던 leader만 가능
  //@userInfo() user: User
  @Workers(CardWorker.Leader)
  @Patch(':cardId')
  async update(@Param('cardId') cardId: string, @Body() updateCardDto: UpdateCardDto) {
    await this.cardService.update(
      +cardId,
      updateCardDto.title,
      updateCardDto.content,
      updateCardDto.deadline,
    );
  }

  //카드 삭제하기(o)
  //카드 생성했던 leader만 가능
  @Workers(CardWorker.Leader)
  @Delete(':cardId')
  async remove(@Param('cardId') cardId: string) {
    await this.cardService.remove(+cardId);
  }

  //카드 이동하기
  //카드 생성했던 leader만 가능
  @Workers(CardWorker.Leader)
  @Patch(':cardId/move')
  async moveCard(@Param('cardId') cardId: string, @Body() moveCardDto: MoveCardDto) {
    await this.cardService.moveCard(+cardId, moveCardDto.listOrder, moveCardDto.cardOrder);
  }

  //작업자 수정(o)
  //카드 생성했던 leader만 가능
  @Workers(CardWorker.Leader)
  @Post(':cardId/worker')
  async addWorker(@Param('cardId') cardId: number, @Body() addWorkerDto: AddWorkerDto) {
    await this.cardService.addWorker(cardId, addWorkerDto.memberId);
  }

  //작업자 삭제(o)
  //카드 생성했던 leader만 가능
  @Workers(CardWorker.Leader)
  @Delete(':workerId/worker')
  async deleteWorker(@Param('workerId') workerId: number) {
    await this.cardService.deleteWorker(workerId);
  }

}
