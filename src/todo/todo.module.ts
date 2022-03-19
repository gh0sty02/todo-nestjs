import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
