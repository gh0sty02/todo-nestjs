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
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return 'User says hello';
  }

  @Post()
  async createUser(@Body() body: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.userService.create(body);
    } catch (err) {
      throw err;
    }
  }

  @Get('/all')
  async allUsers(): Promise<User[]> {
    const users = await this.userService.getUsers();

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUser(Number(id));
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
