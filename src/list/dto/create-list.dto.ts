import { IsNotEmpty } from 'class-validator';

// 보드 내부 컬럼 생성하기
export class CreateListDto {
  @IsNotEmpty()
  title: string;
}
