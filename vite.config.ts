import trpc from './trpc/vite-plugin';
import ssr from 'vike/plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react({}), ssr({}), trpc()],
  resolve: {
    alias: {
      '~': __dirname,
    },
  },
});
