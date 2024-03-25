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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Board } from './entities/board.entity';

@ApiTags('Board')
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '보드 생성',
  })
  @ApiCreatedResponse({ description: '보드를 생성합니다.' })
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @userInfo() user: User,
  ) {
    return await this.boardService.create(createBoardDto, user);
  }
  // 내가 생성한 board 조회
  @UseGuards(BoardMemberGuard)
  @Get('my-board')
  @ApiOperation({
    summary: '보드 조회',
  })
  @ApiCreatedResponse({
    description: '내가 생성한 보드를 조회합니다.',
    type: Board,
  })
  async findAll(@userInfo() user: User) {
    return await this.boardService.findAll(user);
  }
  // 내가 참여하는 board 조회
  @UseGuards(BoardMemberGuard)
  @Get('my-project')
  @ApiOperation({
    summary: '보드 조회',
  })
  @ApiCreatedResponse({
    description: '내가 멤버로 참여하고 있는 보드를 조회합니다.',
    type: Board,
  })
  async findAllMyTeamProject(@userInfo() user: User) {
    return await this.boardService.findAllMyTeamProject(user);
  }
  // board 상세조회
  @UseGuards(BoardMemberGuard)
  @Get(':boardId')
  @ApiOperation({
    summary: '보드 상세 조회',
  })
  @ApiCreatedResponse({
    description: '특정 보드를 상세 조회합니다.',
    type: Board,
  })
  async findBoard(@Param('boardId') boardId: number) {
    return await this.boardService.findBoard(boardId);
  }
  // board 수정
  @UseGuards(BoardMemberGuard)
  @Patch(':boardId')
  @ApiOperation({
    summary: '보드 수정',
  })
  @ApiCreatedResponse({
    description: '내가 생성한 보드를 수정합니다.',
    type: Board,
  })
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
  @ApiOperation({
    summary: '보드 삭제',
  })
  @ApiCreatedResponse({
    description: '내가 생성한 보드를 삭제합니다.',
    type: Board,
  })
  async remove(@Param('boardId') boardId: number, @userInfo() user: User) {
    return await this.boardService.remove(boardId, user);
  }
}
