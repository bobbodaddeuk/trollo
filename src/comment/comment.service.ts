import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  // 댓글 달기
  async createComment(
    boardId: number,
    listId: number,
    cardId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      boardId,
      listId,
      cardId,
    });
    await this.commentRepository.save(comment);
    return comment;
  }
  // 댓글 조회
  async findAllComment(boardId: number, listId: number, cardId: number) {
    const comments = this.commentRepository.find({
      where: {
        board: { boardId },
        list: { listId },
        card: { cardId },
      },
    });
    return comments;
  }

  // 댓글 수정
  async updateComment(boardId: number, listId: number, cardId: number) {}

  // 댓글 삭제
  async deleteComment(boardId: number, listId: number, cardId: number) {}
}
