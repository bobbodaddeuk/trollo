import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
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

  // // 컬럼 1개 찾기
  // @Get('/list/:listId')

  // 컬럼 생성하기.
  @UseGuards(JwtAuthGuard)
  @Post() // url 추가적으로 작성해줘야함(기능은 잘 돌아감)
  // 클라이언트가 body에 담아서 보내야 하는 것
  create(@Body() createListDto: CreateListDto, @userInfo() user: User) {
    this.listService.createList(createListDto, user);
    return {
      status: HttpStatus.CREATED,
      message: `새로운 컬럼이 생성되었습니다.`,
    };
    // return { statusCode: HttpStatus.OK, message: '내 정보 수정에 성공했습니다.', data: updatedUser, };
  }

  // 컬럼 제목 변경
  @UseGuards(JwtAuthGuard)
  @Patch('/:listId')
  changeListTile(
    @Body() updatedListDto: UpdatedListDto,
    @Param('listId') listId: number,
    @userInfo() user: User,
  ) {
    return this.listService.changeListTitle(updatedListDto, listId, user);
  }

  // 컬럼 삭제 하기
  @UseGuards(JwtAuthGuard)
  @Delete('/:listId')
  deleteList(@Param('listId') listId: number, @userInfo() user: User) {
    return this.listService.deleteList(listId, user);
  }
}
