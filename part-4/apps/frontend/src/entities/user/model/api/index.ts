import { axiosInstance, User } from '../../../../shared';

export const getUserProfile = async () => {
  return await axiosInstance.get<Omit<User, 'accessToken'>>(
    '/api/auth/profile'
  );
};

export interface AuthUser {
  email: string;
  password: string;
  username?: string;
}

export const getLoginUser = async ({
  loginType,
  data,
}: {
  loginType: string;
  data: AuthUser;
}) => {
  return await axiosInstance.post<User>('/api/auth/' + loginType, data);
};
