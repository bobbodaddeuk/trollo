import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsEnum } from 'class-validator';
import { Grade } from '../type/grade.type';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @IsEnum(Grade)
  grade: Grade;
}
