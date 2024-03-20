import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { userInfo } from 'src/utils/userInfo.decorator';
import { User } from './entities/user.entity';

@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findMe(@userInfo() user: User) {
    const data = await this.userService.findOneById(user);

    return {
      statusCode: HttpStatus.OK,
      message: '내 정보 조회에 성공했습니다.',
      data,
    };
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @userInfo() user: User,
  ) {
    const updatedUser = await this.userService.updateUser(
      user.id,
      updateUserDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: '내 정보 수정에 성공했습니다.',
      data: updatedUser,
    };
  }
}
