import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class CreateBoardDto {
  /*
   * boardName
   * @example "보드이름1"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  boardName: string;
  /*
   * description
   * @example "보드에 대한 설명 예시"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}
