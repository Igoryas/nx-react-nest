import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { TaskModel } from '../../tasks/models/task.model';

@Schema({ collection: 'users', timestamps: true })
export class UserModel extends Document implements IUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [Types.ObjectId], ref: TaskModel.name })
  tasks: TaskModel[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
