import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Req,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RequestWithUser } from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwt(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;

    return res.send(user);
  }

  @Post('logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    return res.sendStatus(200);
  }
}
