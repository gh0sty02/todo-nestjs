import { IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
