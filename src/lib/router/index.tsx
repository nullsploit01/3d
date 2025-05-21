import { createBrowserRouter } from 'react-router';

import HomePage from '@/pages/home';
import Library from '@/pages/library';
import LibraryHome from '@/pages/library/home';
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
        path: '',
        element: <LibraryHome />,
      },
      {
        path: 'loading',
        element: <Loading />,
      },
    ],
  },
]);
