import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
    const registeredUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!registeredUser) {
      const encryptedPassword = await bcrypt.hash(user.password, 10);
      return this.prismaService.user.create({
        data: {
          ...user,
          password: encryptedPassword,
        },
      });
    }

    throw new BadRequestException('User Already Exists');
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('No User found');
    }

    return user;
  }

  async updateUser(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...user,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
