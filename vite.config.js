import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Import the Vue plugin
import autoprefixer from 'autoprefixer'; // Import the autoprefixer plugin

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  build: {
    outDir: 'dist',
    minify: true,
    assetsInlineLimit: 10240,
  },

  plugins: [
    vue(), // Use the Vue plugin
  ],

  resolve: {
    alias: {
      '@': '/src', // Point '@' alias to the root of the project directory
    },
  },

  css: {
    postcss: {
      plugins: [
        autoprefixer(), // Use autoprefixer plugin
      ],
    },
    modules: true,
  },
});
