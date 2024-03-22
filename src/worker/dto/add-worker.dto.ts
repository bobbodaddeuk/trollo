import { IsNotEmpty, IsNumber } from "class-validator";

export class AddWorkerDto {
    @IsNumber()
    @IsNotEmpty({ message: '작업자의 멤버 id값을 입력해주세요.' })
    memberId: number;
}