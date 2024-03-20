import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Import the vue plugin

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
    vue(), // Use the vue plugin
  ],

  resolve: {
    alias: {
      '@': './src', // Remove the leading slash
    },
  },

  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
      ],
    },
    modules: true,
  },
});
