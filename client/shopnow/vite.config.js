import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Adjust this if your application will be deployed to a subdirectory
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://shopnow-073b.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Strip '/api' from request path
      },
    },
  },
});
