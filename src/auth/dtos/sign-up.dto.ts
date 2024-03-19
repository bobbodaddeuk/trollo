import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto extends PickType(User, ['email', 'password', 'name']) {
  @IsNotEmpty({ message: '비밀번호 확인을 입력해 주세요.' })
  @IsString()
  passwordConfirm: string;
}
