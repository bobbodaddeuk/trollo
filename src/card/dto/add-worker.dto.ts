import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CardWorker } from "../types/card.type";

export class AddWorkerDto {
    @IsEnum(CardWorker)
    @IsNotEmpty({ message: '해당 카드의 작업자의 권한을 입력해주세요.' })
    worker: CardWorker;

    @IsString()
    @IsNotEmpty({ message: '작업자의 이름을 입력해주세요.' })
    name: string;
}