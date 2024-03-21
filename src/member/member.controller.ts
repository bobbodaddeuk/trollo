import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { userInfo } from 'src/utils/userInfo.decorator';
import { BoardMemberGuard } from 'src/board/guards/board-member.guard';
import { GradesGuard } from './guards/grades.guard';
import { Grades } from './decorators/grade.decorator';
import { MemberGrade } from './type/grade.type';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@UseGuards(BoardMemberGuard)
@UseGuards(GradesGuard)
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  // 멤버 생성(초대)
  @Post(':boardId')
  create(
    @Body() createMemberDto: CreateMemberDto,
    @Param('boardId') boardId: number,
    @userInfo() user: User,
  ) {
    return this.memberService.create(createMemberDto, boardId, user);
  }
  // 보드 멤버 조회
  @Get(':boardId')
  findAll(@Param('boardId') boardId: number) {
    return this.memberService.findAll(boardId);
  }
  // 멤버 권한 수정하기
  @Grades(MemberGrade.OWNER)
  @Patch(':memberId')
  update(
    @Param('memberId') memberId: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(memberId, updateMemberDto);
  }
  // 멤버 삭제하기
  @Grades(MemberGrade.OWNER)
  @Delete(':memberId')
  async remove(@Param('memberId') memberId: number, @Res() res: Response) {
    const removeMember = await this.memberService.remove(memberId);
    return res
      .status(200)
      .json({ message: `${removeMember}를 삭제하였습니다.` });
  }
}
