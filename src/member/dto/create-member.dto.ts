import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Grade } from '../type/grade.type';

export class CreateMemberDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsEnum(Grade)
  grade: Grade;
}
