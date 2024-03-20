import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';

@Controller('/list/:boardId/column')
export class ListController {
  constructor(private readonly listService: ListService) {}

  // 컬럼 생성하기.
  @Post('/')
  // 클라이언트가 body에 담아서 보내야 하는 것
  create(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listService.createList(createListDto);
  }

  // 컬럼 제목 변경
  @Patch('/:listId')
  changeListTile(
    @Body() createListDto: CreateListDto,
    @Param('listId') listId: number,
  ) {
    return this.listService.changeListTitle(createListDto, listId);
  }
}
