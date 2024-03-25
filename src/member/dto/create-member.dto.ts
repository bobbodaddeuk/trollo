import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MemberGrade } from '../type/grade.type';

export class CreateMemberDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEnum(MemberGrade)
  grade: MemberGrade;
}
