import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dtos/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.',
      data,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  signIn(@Request() req, @Body() signInDto: SignInDto) {
    const data = this.authService.signIn(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      data,
    };
  }
  // @UseGuards(AuthGuard('jwt'))
  // @Post('/logout')
  // logout(@Request() req: any, @Res() res: any) {
  //   return res.status(HttpStatus.OK).json({
  //     statusCode: HttpStatus.OK,
  //     message: '로그아웃 되었습니다.',
  //   });
  // }
}
