import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('otp/send')
  sendOtp(@Body() body: any) {
    return { message: 'Scaffolding only', received: body };
  }

  @Public()
  @Post('otp/verify')
  verifyOtp(@Body() body: any) {
    return { message: 'Scaffolding only', received: body };
  }

  @Public()
  @Post('password/forgot')
  forgotPassword(@Body() body: any) {
    return { message: 'Scaffolding only', received: body };
  }

  @Public()
  @Post('password/reset')
  resetPassword(@Body() body: any) {
    return { message: 'Scaffolding only', received: body };
  }

  @Public()
  @Post('token/refresh')
  refresh(@Body() body: any) {
    return { message: 'Scaffolding only', received: body };
  }

  @Public()
  @Post('social/google')
  google(@Body() body: any) {
    return { message: 'Scaffolding only', received: body };
  }

  @Public()
  @Post('social/apple')
  apple(@Body() body: any) {
    return { message: 'Scaffolding only', received: body };
  }
}
