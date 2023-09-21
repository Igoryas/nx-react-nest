import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../../pages/authPage';
import { Dashboard } from '../../pages/dashboard';

export const router = (App: ReactNode) =>
  createBrowserRouter([
    {
      path: '/',
      element: App,
      children: [
        {
          path: '/auth-form',
          element: <Auth />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '*',
          element: <Auth />,
        },
      ],
    },
  ]);
