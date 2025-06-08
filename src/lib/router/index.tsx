import { createBrowserRouter } from 'react-router';

import HomePage from '@/pages/home';
import Library from '@/pages/library';
import LibraryHome from '@/pages/library/home';
import LightShader from '@/pages/library/light-shader';

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
        path: 'light-shaders',
        element: <LightShader />,
      },
    ],
  },
]);
