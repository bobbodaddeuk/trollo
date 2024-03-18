import { Controller, Post, Body } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';

@Controller('/:boardId')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('/colum')
  create(@Body() createListDto: CreateListDto) {
    return this.listService.createList(createListDto);
  }
}
