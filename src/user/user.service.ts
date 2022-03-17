import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/CreateUser.dto';

import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async create(user: CreateUser): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  async getUser(id: number): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
