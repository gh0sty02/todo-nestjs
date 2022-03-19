import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
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

  async deleteTodo(id: number) {
    try {
      return this.prisma.todo.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Todo not found');
    }
  }

  async updateTodo(id: number, todo: Prisma.TodoUpdateInput) {
    try {
      return this.prisma.todo.update({
        where: { id },
        data: {
          ...todo,
        },
      });
    } catch (error) {
      throw new NotFoundException('Todo not found');
    }
  }
}
