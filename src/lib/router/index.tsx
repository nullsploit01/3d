import { createBrowserRouter } from 'react-router';

import HomePage from '@/pages/home';
import Library from '@/pages/library';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/library',
    element: <Library />,
  },
]);
