import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsEnum } from 'class-validator';
import { MemberGrade } from '../type/grade.type';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsEnum(MemberGrade)
  grade: MemberGrade;
}
