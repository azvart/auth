import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import * as process from 'process';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  @Post('/signin')
  public async signIn(@Body() data: any, @Res() res: Response) {
    const token = await this.authService.signIn(data);
    // res.cookie('next-auth.session-token', token, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    // });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.redirect(302, process.env.CLIENT_APP);
  }
}
