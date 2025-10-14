// vite.config.js
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  base: '/3D-Portfolio/',

  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'esnext', // Best for modern browsers
    sourcemap: true,
    cssMinify: true,

    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three'],
          vendor: [
            '@react-three/fiber',
            '@react-three/drei',
            'framer-motion',
            'gsap',
          ],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },

  server: {
    open: true,
    host: true,
    port: 5173,
  },

  preview: {
    port: 8080,
  },
}));
