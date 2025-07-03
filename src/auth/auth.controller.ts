import { Controller, Get, Req, Res, Query, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signUp(email, password);
  }

  @Post('signin')
  async signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }

  @Get('google')
  async googleAuth(@Req() req: Request, @Res() res: Response) {
    const { url } = await this.authService.googleLogin();
    return res.redirect(url);
  }

  @Get('google/callback')
  async googleAuthCallback(@Query('code') code: string, @Res() res: Response) {
    const { session, user } = await this.authService.handleGoogleCallback(code);
    // You can handle the session and user data here, e.g., save to database, generate JWT
    // For now, let's just redirect to a success page or return user info
    return res.json({ session, user });
  }

  @Get('user')
  async getUser(@Req() req: Request) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      return { message: 'No access token provided' };
    }
    return this.authService.getUser(accessToken);
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      return { message: 'No access token provided' };
    }
    return this.authService.logout();
  }
}
