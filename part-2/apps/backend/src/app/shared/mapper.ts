import { UserDto } from '../users/dto/user.dto';
import { UserModel } from '../users/models/user.model';

export const toUserDto = (data: UserModel): UserDto => {
  const { id, username, email } = data;

  const userDto: UserDto = {
    id,
    username,
    email,
  };

  return userDto;
};
