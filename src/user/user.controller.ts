import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma, User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async register(@Body() body: Prisma.UserCreateInput, @Res() res: Response) {
    const user = await this.userService.create(body);
    const cookie = this.authService.getCookieWithJwt(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;

    return res.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:email')
  async getUser(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/')
  async allUsers(): Promise<User[]> {
    const users = await this.userService.getUsers();

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
