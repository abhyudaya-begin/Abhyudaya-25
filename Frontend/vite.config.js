import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // For proper asset linking in serve
  build: {
    outDir: 'dist',
  },
});
