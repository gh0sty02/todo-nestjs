import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { CreateTodoDTO } from './dto/createTodo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodosController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/all')
  async getTodos(): Promise<Todo[]> {
    const todos = await this.todoService.getTodos();
    if (!todos) {
      throw new NotFoundException('Todos not found');
    }
    return todos;
  }

  @Post()
  async createTodo(
    @Body() body: Prisma.TodoUncheckedCreateInput,
  ): Promise<Todo> {
    return this.todoService.createTodo(body);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(Number(id));
  }

  @Patch('/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() body: Prisma.TodoUpdateInput,
  ) {
    return this.todoService.updateTodo(Number(id), body);
  }
}
