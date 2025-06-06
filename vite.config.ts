import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import restart from 'vite-plugin-restart';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    glsl(),
    restart({
      reload: ['**'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
