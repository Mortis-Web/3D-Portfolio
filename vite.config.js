import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: false, // no eval in dev
  },
  esbuild: {
    legalComments: 'none',
  },

  plugins: [react(), tailwindcss()],
  base: '/3D-Portfolio/',
});
