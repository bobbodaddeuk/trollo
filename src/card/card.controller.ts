import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CardService } from './card.service';
import { MoveCardDto } from './dto/move-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { BoardMemberGuard } from 'src/board/guards/board-member.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkersGuard } from 'src/worker/guards/workers.guard';
import { CardWorker } from 'src/worker/types/worker.type';
import { userInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { Workers } from 'src/worker/decorators/workers.decorator';

@UseGuards(JwtAuthGuard)
@UseGuards(BoardMemberGuard)
@UseGuards(WorkersGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  //카드 생성하기
  //카드 생성한 사람 leader 권한 부여 필요
  @Post(':boardId/:listId')
  async create(
    @Param('boardId') boardId: number,
    @Param('listId') listId: number,
    @userInfo() user: User,
  ) {
    const card = await this.cardService.create(boardId, listId, user);

    return {
      statusCode: HttpStatus.OK,
      message: '카드 생성에 성공했습니다.',
      card,
    };
  }

  //카드 목록 조회(o)
  @Get(':boardId/:listId')
  async findCards(
    @Param('boardId') boardId: number,
    @Param('listId') listId: number,
  ) {
    const cards = await this.cardService.findCards(boardId, listId);

    return {
      statusCode: HttpStatus.OK,
      message: '카드 목록 조회에 성공했습니다.',
      cards,
    };
  }

  //카드 상세 조회(o)
  @Get(':cardId')
  async findCard(@Param('cardId') cardId: number) {
    const card = await this.cardService.findCard(cardId);

    return {
      statusCode: HttpStatus.OK,
      message: '카드 상세 조회에 성공했습니다.',
      card,
    };
  }

  //카드 수정하기(카드 내용 추가)(o)
  //카드 생성했던 leader만 가능
  @Workers(CardWorker.Leader)
  @Patch(':cardId')
  async update(
    @Param('cardId') cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    const card = await this.cardService.update(
      +cardId,
      updateCardDto.title,
      updateCardDto.content,
      updateCardDto.deadline,
    );

    return {
      statusCode: HttpStatus.OK,
      message: '카드 수정에 성공했습니다.',
      card,
    };
  }

  //카드 삭제하기(o)
  //카드 생성했던 leader만 가능
  @Workers(CardWorker.Leader)
  @Delete(':cardId')
  async remove(@Param('cardId') cardId: string) {
    const card = await this.cardService.remove(+cardId);

    return {
      statusCode: HttpStatus.OK,
      message: '카드 삭제에 성공했습니다.',
      card,
    };
  }

  //카드 이동하기
  //카드 생성했던 leader만 가능
  @Workers(CardWorker.Leader)
  @Patch(':cardId/move')
  async moveCard(
    @Param('cardId') cardId: string,
    @Body() moveCardDto: MoveCardDto,
  ) {
    const cards = await this.cardService.moveCard(
      +cardId,
      moveCardDto.listOrder,
      moveCardDto.cardOrder,
    );
    return {
      statusCode: HttpStatus.OK,
      message: '카드 이동에 성공했습니다.',
      cards
    };
  }
}
