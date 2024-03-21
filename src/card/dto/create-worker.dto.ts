import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MoveCardDto {
    @IsNumber()
    @IsNotEmpty({ message: '옮기고자 하는 카드의 listId값을 입력해주세요' })
    cardId: number;

    @IsString()
    @IsNotEmpty({ message: '해당 카드에 추가하고 싶은 작업자를 입력해주세요.' })
    worker: string;
}
