import { IsNumber, IsString } from 'class-validator';

export class CreateUser {
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
