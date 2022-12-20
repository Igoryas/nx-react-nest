import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TasksInterface } from '../interfaces/tasks.interface';

@Schema({ collection: 'tasks', timestamps: true })
export class TaskModel extends Document implements TasksInterface {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  title: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
