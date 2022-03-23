import { Injectable, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma, Todo } from '@prisma/client';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDTO } from './dto/createTodo.dto';

@Injectable()
export class TodoService {
  constructor(readonly prisma: PrismaService) {}

  async getTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async createTodo(todo: Prisma.TodoUncheckedCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data: todo,
    });
  }

  async deleteTodo(id: string) {
    try {
      return this.prisma.todo.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Todo not found');
    }
  }

  async updateTodo(id: string) {
    try {
      return this.prisma.todo.update({
        where: { id },
        data: {
          done: true,
        },
      });
    } catch (error) {
      throw new NotFoundException('Todo not found');
    }
  }
}
