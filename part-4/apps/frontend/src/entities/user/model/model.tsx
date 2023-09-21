import { create } from 'zustand';
import { AxiosError } from 'axios';
import { AuthUser, getLoginUser, getUserProfile } from './api';
import { useAccessToken, User } from '../../../shared';

interface UserState extends User {
  error: string[];
  loading: boolean;
  resetUser: () => void;
  fetchLoginUser: (loginFormData: AuthUser) => Promise<void>;
  fetchUserProfile: () => void;
}

const initialState = {
  accessToken: useAccessToken.getState().accessToken,
  email: '',
  username: '',
  error: [],
  loading: false,
};

export const useUserState = create<UserState>((set, get) => ({
  ...initialState,

  resetUser: () => {
    window.localStorage.removeItem('jwt');
    set({ ...initialState, accessToken: null });
    useAccessToken.setState({ accessToken: null });
  },
  fetchLoginUser: async (loginFormData) => {
    const { loading } = get();
    if (!loading) {
      set({ loading: true });
      try {
        const loginType = loginFormData.username ? 'register' : 'login';

        const {
          data: { accessToken, email, username },
        } = await getLoginUser({ loginType, data: loginFormData });

        window.localStorage.setItem('jwt', 'Bearer ' + accessToken);
        const createAccessToken = 'Bearer ' + accessToken;
        useAccessToken.setState({ accessToken: createAccessToken });
        set({
          accessToken: createAccessToken,
          error: [],
          email: email,
          username: username,
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { message } = error.response.data;
          set({ error: Array.isArray(message) ? message : [message] });
        }
      }
    }
    set({ loading: false });
  },
  fetchUserProfile: async () => {
    const { accessToken, username, loading } = get();

    if (!username && !loading) {
      set({ loading: true });
      try {
        const {
          data: { email, username },
        } = await getUserProfile();
        set({ error: [], email, username });
        useAccessToken.setState({ accessToken });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { message } = error.response.data;
          set({ error: Array.isArray(message) ? message : [message] });
        }
      }
    }
    set({ loading: false });
  },
}));
