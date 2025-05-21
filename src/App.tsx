import './globals.css';
import { router } from './lib/router';
import { RouterProvider } from 'react-router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
