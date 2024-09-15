import { useEffect } from 'react';
import { getCookie } from '../helpers/cookies';
import { APP_ROUTES } from '../types/router';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie('access_token')) {
      navigate(APP_ROUTES.LOGIN);
    }
  });
};
