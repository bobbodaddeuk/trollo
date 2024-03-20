import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updatedListDto {
  @IsString()
  @IsNotEmpty({ message: '변경할 제목을 입력해주세요.' })
  title: string;

  @IsNumber()
  listId?: number;
}
