import { IsBoolean, IsObject, IsString } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  title: string;

  @IsBoolean()
  done: boolean;

  @IsObject()
  user: {
    id: number;
  };
}
