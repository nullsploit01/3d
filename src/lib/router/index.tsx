import { createBrowserRouter } from 'react-router';

import HomePage from '@/pages/home';
import Library from '@/pages/library';
import Loading from '@/pages/library/loading';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/library',
    element: <Library />,
    children: [
      {
        path: 'loading',
        element: <Loading />,
      },
    ],
  },
]);
