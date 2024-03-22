import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteWorkerDto {
    @IsNumber()
    @IsNotEmpty({ message: '해당 카드에서 삭제하고 싶은 작업자의 memberId를 입력해주세요.' })
    memberId: number;
}
