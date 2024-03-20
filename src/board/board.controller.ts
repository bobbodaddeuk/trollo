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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { GradesGuard } from './guards/grades.guard';
import { Grades } from './decorators/grade.decorator';
import { MemberGrade } from 'src/member/type/grade.type';
import { userInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard)
@UseGuards(GradesGuard)
@Controller('boards') // userId 필요
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  // board 생성
  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }
  // 내가 생성한 board 조회
  @Get()
  async findAll(@userInfo() user: User) {
    return await this.boardService.findAll(user);
  }
  // 내가 참여하는 board 조회
  @Get()
  async findAllMyTeamProject(@userInfo() user: User) {
    return await this.boardService.findAllMyTeamProject(user);
  }
  // board 상세조회
  @Get(':boardId')
  findOne(@Param('boardId') boardId: number) {
    return this.boardService.findOne(boardId);
  }
  // board 수정
  @Grades(MemberGrade.OWNER)
  @Patch(':boardId')
  update(
    @Param('boardId') boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(boardId, updateBoardDto);
  }
  // board 삭제
  @Grades(MemberGrade.OWNER)
  @Delete(':boardId')
  remove(@Param('boardId') boardId: number) {
    return this.boardService.remove(boardId);
  }
}
