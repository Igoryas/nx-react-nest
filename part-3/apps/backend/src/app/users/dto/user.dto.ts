import { IsNotEmpty, IsEmail } from 'class-validator';
import { TaskDto } from '../../tasks/dto/task.dto';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  tasks: TaskDto[];
}
