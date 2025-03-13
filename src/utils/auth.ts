import { NextRouter } from 'next/router';

export const handleAuthNavigation = (router: NextRouter) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    router.replace('/Auth');
    return false;
  }
  return true;
};

export const checkAuth = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
}; 