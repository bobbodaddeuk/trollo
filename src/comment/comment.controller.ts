import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  //댓글 달기
  @Post('/:boardId/:listId/:cardId')
  async createComment(
    @Param('boardId') boardId: number,
    @Param('listId') listId: number,
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentService.createComment(
      boardId,
      listId,
      cardId,
      createCommentDto,
    );
    return comment;
  }
  // 댓글 조회
  @Get('/:boardId/:listId/:cardId')
  findAllComment(
    @Param('boardId') boardId: number,
    @Param('listId') listId: number,
    @Param('cardId') cardId: number,
  ) {
    const comments = this.commentService.findAllComment(
      boardId,
      listId,
      cardId,
    );
    return comments;
  }

  // 댓글 수정
  @Put('/:boardId/:listId/:cardId')
  updateComment(
    @Param('boardId') boardId: number,
    @Param('listId') listId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.commentService.updateComment(boardId, listId, cardId);
  }

  // 댓글 삭제
  @Delete('/:boardId/:listId/:cardId')
  deleteComment(
    @Param('boardId') boardId: number,
    @Param('listId') listId: number,
    @Param('cardId') cardId: number,
  ) {
    return this.commentService.deleteComment(boardId, listId, cardId);
  }
}
