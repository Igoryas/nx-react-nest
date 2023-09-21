import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
