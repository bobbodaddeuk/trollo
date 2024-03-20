import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { UpdatedListDto } from './dto/update-list.dto';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  // // 컬럼 1개 찾기
  // @Get('/list/:listId')

  // 컬럼 생성하기.
  @Post('/list/:boardId/column')
  // 클라이언트가 body에 담아서 보내야 하는 것
  create(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listService.createList(createListDto);
  }

  // 컬럼 제목 변경
  @Patch('/list/:boardId/column/:listId')
  changeListTile(
    @Body() title: UpdatedListDto,
    @Param('listId') listId: number,
  ) {
    return this.listService.changeListTitle(title, listId);
  }
}
