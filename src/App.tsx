import './globals.css';
import { router } from './lib/router';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { RouterProvider } from 'react-router';

const App = () => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      <RouterProvider router={router} />
    </NextThemesProvider>
  );
};

export default App;
