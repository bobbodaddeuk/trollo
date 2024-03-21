import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  //댓글 달기
  @Post('/:boardId/:listId/:cardId')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Param()
    params: { boardId: number; listId: number; cardId: number },
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { boardId, listId, cardId } = params;
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
  @UseGuards(JwtAuthGuard)
  async findAllComment(
    @Param()
    params: {
      boardId: number;
      listId: number;
      cardId: number;
    },
  ) {
    const { boardId, listId, cardId } = params;
    const comments = await this.commentService.findAllComment(
      boardId,
      listId,
      cardId,
    );
    return comments;
  }

  // 댓글 수정
  @Put('/:boardId/:listId/:cardId/:commentId')
  @UseGuards(JwtAuthGuard)
  updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @Param()
    params: {
      boardId: number;
      listId: number;
      cardId: number;
      commentId: number;
    },
  ) {
    const { boardId, listId, cardId, commentId } = params;
    return this.commentService.updateComment(
      boardId,
      listId,
      cardId,
      commentId,
      updateCommentDto,
    );
  }

  // 댓글 삭제
  @Delete('/:boardId/:listId/:cardId/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param()
    params: {
      boardId: number;
      listId: number;
      cardId: number;
      commentId: number;
    },
  ): Promise<{ message: string }> {
    const { boardId, listId, cardId, commentId } = params;
    return this.commentService.deleteComment(
      boardId,
      listId,
      cardId,
      commentId,
    );
  }
}
