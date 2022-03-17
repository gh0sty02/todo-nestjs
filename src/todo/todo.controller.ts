import { Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodosController {
  // constructor(private readonly todoService: TodoService) {}

  @Get()
  getHello(): string {
    return 'Todo says hello';
  }

  @Post()
  createTodo(): string {
    return 'This action adds a new todo';
  }
}
