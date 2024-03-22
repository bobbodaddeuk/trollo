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
import { userInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardMemberGuard } from './guards/board-member.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Board')
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  // board 생성
  /*
   * board 생성
   * @param createBoardDto
   * @param user
   * @returns
   */
  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @userInfo() user: User,
  ) {
    return await this.boardService.create(createBoardDto, user);
  }
  // 내가 생성한 board 조회
  @UseGuards(BoardMemberGuard)
  @Get('my-board')
  async findAll(@userInfo() user: User) {
    return await this.boardService.findAll(user);
  }
  // 내가 참여하는 board 조회
  @UseGuards(BoardMemberGuard)
  @Get('my-project')
  async findAllMyTeamProject(@userInfo() user: User) {
    return await this.boardService.findAllMyTeamProject(user);
  }
  // board 상세조회
  @UseGuards(BoardMemberGuard)
  @Get(':boardId')
  async findBoard(@Param('boardId') boardId: number, @userInfo() user: User) {
    console.log('user.id', user.id);
    return await this.boardService.findBoard(boardId, user);
  }
  // board 수정
  @UseGuards(BoardMemberGuard)
  @Patch(':boardId')
  async update(
    @Param('boardId') boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @userInfo() user: User,
  ) {
    return await this.boardService.update(boardId, updateBoardDto, user);
  }
  // board 삭제
  @UseGuards(BoardMemberGuard)
  @Delete(':boardId')
  async remove(@Param('boardId') boardId: number, @userInfo() user: User) {
    return await this.boardService.remove(boardId, user);
  }
}
