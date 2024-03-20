import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';

import { UpdatedListDto } from './dto/update-list.dto';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  // // 컬럼 1개 찾기
  // @Get('/list/:listId')

  // 컬럼 생성하기.
  @Post('/list/:boardId/list')
  // 클라이언트가 body에 담아서 보내야 하는 것
  create(@Body() createListDto: CreateListDto) {
    return this.listService.createList(createListDto);
  }

  // 컬럼 제목 변경
  @Patch('/list/:boardId/list/:listId')
  changeListTile(
    @Body() title: UpdatedListDto,
    @Param('listId') listId: number,
  ) {
    return this.listService.changeListTitle(title, listId);
  }

  // 컬럼 삭제 하기
  @Delete('/list/:boardId/list/:listId')
  deleteList(@Param('listId') listId: number) {
    return this.listService.deleteList(listId);
  }
}
