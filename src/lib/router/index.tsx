import HomePage from '../../pages/home';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
