// vite.config.js
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer'; // 📊 optional bundle analyzer
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression'; // 🧩 Gzip/Brotli compression

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  // 🧭 Use GitHub Pages path in production, local root in dev
  base: mode === 'production' ? '/3D-Portfolio/' : '/',

  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
    }),
    tailwindcss(),

    // 🧩 Add pre-compressed Brotli + Gzip assets
    viteCompression({
      verbose: false,
      disable: false,
      threshold: 10240, // only compress >10kb
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    viteCompression({
      verbose: false,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),

    // 📊 Optional visualizer: open after build to analyze bundle size
    mode === 'analyze' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'esnext', // ✅ Modern browsers
    sourcemap: mode === 'development',
    cssMinify: true,
    reportCompressedSize: true,
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
      },
      format: {
        comments: false,
      },
    },

    chunkSizeWarningLimit: 600, // stricter, warns sooner

    rollupOptions: {
      output: {
        // 🧠 Smart chunk splitting for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'three';
            if (id.includes('react')) return 'react';
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('@react-three')) return 'r3f';
            return 'vendor';
          }
        },
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
      },
    },
  },

  esbuild: {
    legalComments: 'none',
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },

  server: {
    open: true,
    host: true,
    port: 5173,
    strictPort: false, // ✅ avoids "Port in use" restarts
  },

  preview: {
    port: 8080,
  },
}));
