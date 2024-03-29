import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Adjust this if your application will be deployed to a subdirectory
  plugins: [react()],
 
});
