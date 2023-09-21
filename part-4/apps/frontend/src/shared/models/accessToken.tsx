import { create } from 'zustand';

interface AccessToken {
  accessToken: string | null;
}
export const useAccessToken = create<AccessToken>(() => ({
  accessToken: window.localStorage.getItem('jwt'),
}));
