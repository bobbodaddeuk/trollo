import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdatedListDto } from './dto/update-list.dto';
import { userInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardMemberGuard } from 'src/board/guards/board-member.guard';

@UseGuards(BoardMemberGuard)
@UseGuards(JwtAuthGuard)
@Controller('list/:boardId')
export class ListController {
  constructor(private readonly listService: ListService) { }
  // 컬럼 생성하기.
  @Post()
  // 클라이언트가 body에 담아서 보내야 하는 것
  async create(
    @Body() createListDto: CreateListDto,
    @Param('boardId') boardId: number,
    @userInfo() user: User,
  ) {
    return await this.listService.createList(createListDto, user, boardId);
  }

  // 컬럼 제목 변경
  @Patch(':listId')
  async changeListTile(
    @Body() updatedListDto: UpdatedListDto,
    @Param('listId') listId: number,
    @Param('boardId') boardId: number,
  ) {
    return await this.listService.changeListTitle(updatedListDto, listId, boardId);
  }

  // 컬럼 삭제 하기
  @Delete(':listId')
  async deleteList(@Param('listId') listId: number, @Param('boardId') boardId: number, @userInfo() user: User) {
    return await this.listService.deleteList(boardId, listId, user);
  }

  // 컬럼 위치 이동
  @Patch('index/:listId/:index')
  async changeListPositon(
    @Param('listId') listId: number,
    @Param('index') hopeindex: number,
    // @userInfo() user: User,
  ) {
    return await this.listService.changeListPosition(listId, hopeindex);
  }
}
