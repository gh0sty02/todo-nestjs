import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUser } from './dto/CreateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return 'User says hello';
  }

  @Post()
  async createUser(@Body() body: CreateUser): Promise<User> {
    return this.userService.create(body);
  }

  @Get('/all')
  async createdUser(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(Number(id));
  }
}
