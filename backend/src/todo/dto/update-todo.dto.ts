import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['todo', 'inProgress', 'done'])
  status: string;
}
