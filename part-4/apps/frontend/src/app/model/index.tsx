import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserState } from '../../entities/user';
import { useAccessToken } from '../../shared';

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const { fetchUserProfile } = useUserState();
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      fetchUserProfile();
      navigate('/dashboard');
    } else {
      navigate('/auth-form');
    }
  }, [accessToken, navigate, fetchUserProfile]);
};
