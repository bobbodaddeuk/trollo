import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// 보드 내부 컬럼 생성하기
export class CreateListDto {
  @IsString()
  @IsNotEmpty({ message: 'title을 입력해주세요.' })
  title: string;

  @IsNumber()
  @IsNotEmpty({})
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
