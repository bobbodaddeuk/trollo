import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatedListDto {
  @IsString()
  @IsNotEmpty({ message: '변경할 제목을 입력해주세요.' })
  title: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
