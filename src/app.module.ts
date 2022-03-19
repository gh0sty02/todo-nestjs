import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [TodoModule, UserModule],
  controllers: [AppController, TodosController, UserController],
  providers: [AppService, UserService, TodoService, PrismaService],
})
export class AppModule {}
