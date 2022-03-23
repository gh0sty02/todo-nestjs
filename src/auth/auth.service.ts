import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatching) {
      const { password, email, ...rest } = user;
      return rest;
    }

    return null;
  }

  getCookieWithJwt(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
