import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma, Todo } from '@prisma/client';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(
    @Body() body: Prisma.TodoUncheckedCreateInput,
    @Req() req: RequestWithUser,
  ): Promise<Todo> {
    return this.todoService.createTodo({ ...body, userId: req.user.id });
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }

  @Post('/:id')
  async updateTodoToCompleted(@Param('id') id: string) {
    return this.todoService.updateTodo(id);
  }
}
