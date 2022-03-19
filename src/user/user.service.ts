import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';

import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: {
        todos: true,
      },
    });
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...user,
      },
    });
  }

  async getUser(id: number): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async updateUser(id: number, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...user,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
