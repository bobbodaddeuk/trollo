import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

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
  async findAll() {
    return await this.boardService.findAll(userId);
  }
  // 내가 참여하는 board 조회
  @Get()
  async findAllMyTeamProject() {
    return await this.boardService.findAllMyTeamProject(userId);
  }
  // board 상세조회
  @Get(':boardId')
  findOne(@Param('boardId') boardId: number) {
    return this.boardService.findOne(boardId);
  }
  // board 수정
  @Patch(':boardId')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }
  // board 삭제
  @Delete(':boardId')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
