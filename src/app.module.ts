import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todo/todos/todos.controller';
import { Module } from './todo/.module';
import { TodoModule } from './todo/todo.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [Module, TodoModule, UserModule],
  controllers: [AppController, TodosController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
