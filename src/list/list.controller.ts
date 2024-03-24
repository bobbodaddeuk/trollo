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

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  // 컬럼 생성하기.
  @UseGuards(JwtAuthGuard)
  @Post(':boardId') // url 추가적으로 작성해줘야함(기능은 잘 돌아감)
  // 클라이언트가 body에 담아서 보내야 하는 것
  create(
    @Body() createListDto: CreateListDto,
    @Param('boardId') boardId: number,
    // index: number,
    @userInfo() user: User,
  ) {
    return this.listService.createList(createListDto, user, boardId);
  }

  // 컬럼 제목 변경
  @UseGuards(JwtAuthGuard)
  @Patch(':listId')
  changeListTile(
    @Body() updatedListDto: UpdatedListDto,
    @Param() listId: number,
    @userInfo() user: User,
  ) {
    return this.listService.changeListTitle(updatedListDto, listId, user);
  }

  // 컬럼 삭제 하기
  @UseGuards(JwtAuthGuard)
  @Delete(':listId')
  deleteList(@Param() listId: number, @userInfo() user: User) {
    return this.listService.deleteList(listId, user);
  }

  // 컬럼 위치 이동
  @UseGuards(JwtAuthGuard)
  @Patch('index/:listId/:index')
  changeListPositon(
    @Param('listId') listId: number,
    @Param('index') hopeindex: number,
    // @userInfo() user: User,
  ) {
    return this.listService.changeListPosition(listId, hopeindex);
  }
}
