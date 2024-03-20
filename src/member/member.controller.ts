import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  // 멤버 생성(초대)
  @Post(':boardId')
  create(
    @Body() createMemberDto: CreateMemberDto,
    @Param('boardId') boardId: number,
  ) {
    return this.memberService.create(createMemberDto, boardId);
  }
  // 보드 멤버 조회
  @Get(':boardId')
  findAll(@Param('boardId') boardId: number) {
    return this.memberService.findAll(boardId);
  }
  // 멤버 권한 수정하기
  @Patch(':memberId')
  update(
    @Param('memberId') memberId: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(memberId, updateMemberDto);
  }
  // 멤버 삭제하기
  @Delete(':boardId/:memberId')
  remove(@Param('memberId') memberId: number) {
    return this.memberService.remove(memberId);
  }
}
