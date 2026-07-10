import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

function requestContext(req: any) {
  const forwarded = req?.headers?.['x-forwarded-for'];
  const ipAddress = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : null) ?? req?.ip ?? req?.socket?.remoteAddress ?? null;
  const userAgent = req?.headers?.['user-agent'] ?? null;
  return { ipAddress, userAgent };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() body: SignupDto, @Req() req: any) {
    return this.authService.signup(body, requestContext(req));
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginDto, @Req() req: any) {
    return this.authService.login(body, requestContext(req));
  }

  /** Full login/session history for the currently authenticated user. */
  @Get('sessions')
  sessions(@Req() req: any) {
    return this.authService.getLoginHistory(req.user?.userId);
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
