import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
process.env = { ...process.env, ...loadEnv(process.cwd(), '') };
export default defineConfig({
  envDir: './env',
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env.NODE_ENV': '"development"',
    __DEV__: process.env.NODE_ENV === 'development',
  },
  build: {
    sourcemap: true,
  },
});
