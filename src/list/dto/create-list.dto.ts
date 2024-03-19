import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// 보드 내부 컬럼 생성하기
export class CreateListDto {
  @IsString()
  @IsNotEmpty({ message: 'title을 입력해주세요.' })
  title: string;

  @IsNumber()
  @IsNotEmpty({ message: 'boardId를 입력해주세요.' })
  boardId: number;
}

export class FindListDto {
  @IsNumber()
  @IsNotEmpty({ message: 'boardId를 입력해주세요.' })
  boardId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'columnId를 입력해주세요.' })
  columnId: number;
}
