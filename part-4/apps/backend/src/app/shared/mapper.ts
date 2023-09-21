import { UserDto } from '../users/dto/user.dto';
import { UserModel } from '../users/models/user.model';
import { Types } from 'mongoose';

export const toUserDto = (data: UserModel): UserDto => {
  const { _id, username, email, tasks } = data;

  const userDto: UserDto & { _id: Types.ObjectId } = {
    _id,
    username,
    email,
    tasks,
  };

  return userDto;
};
