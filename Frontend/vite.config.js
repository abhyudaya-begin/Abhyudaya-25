import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are correctly linked
  build: {
    outDir: 'dist', // Default output directory
    rollupOptions: {
      external: ['@material-tailwind/react'],
    },
  },
});
