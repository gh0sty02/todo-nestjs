import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('validating user');
    const user = await this.userService.findUser(email);

    console.log(user);

    if (user && user.password === password) {
      const { password, email, ...rest } = user;
      return rest;
    }

    return null;
  }
}
