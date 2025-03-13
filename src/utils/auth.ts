import { NextRouter } from 'next/router';

export const handleAuthNavigation = (router: NextRouter) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    router.replace('/feed');
    return true;
  }
  return false;
};

export const checkAuth = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
}; 