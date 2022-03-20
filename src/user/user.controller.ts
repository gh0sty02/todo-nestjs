import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.userService.create(body);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return req;
  }

  @Get('/all')
  async allUsers(): Promise<User[]> {
    const users = await this.userService.getUsers();

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  @Get('/:email')
  async getUser(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findUser(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.updateUser(Number(id), body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
