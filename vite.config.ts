import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  return {
    base: '/velka-dunajska-jazda/',
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            icons: ['lucide-react'],
          },
        },
      },
      sourcemap: mode === 'production' ? 'hidden' : true,
      minify: 'esbuild',
      target: 'es2020',
      chunkSizeWarningLimit: 1000,
    },
    preview: {
      port: 4173,
      host: 'localhost',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
