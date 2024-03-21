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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@UseGuards(GradesGuard)
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  // board 생성
  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto, @userInfo() user: User) {
    return this.boardService.create(createBoardDto, user);
  }
  // 내가 생성한 board 조회
  @Grades(MemberGrade.OWNER)
  @Get('my-board')
  async findAll(@userInfo() user: User) {
    return await this.boardService.findAll(user);
  }
  // 내가 참여하는 board 조회
  @Get('my-project')
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
