import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @MinLength(5, { message: '내용은 최소 5자 이상입니다.' })
  @MaxLength(30, { message: '내용은 최대 30자입니다.' })
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  content: string;
}
