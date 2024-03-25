import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '../types/user-role.type';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: '이름은 비워 둘 수 없습니다.' })
  name: string;

  @IsEnum(UserRole)
  role: UserRole;
}
