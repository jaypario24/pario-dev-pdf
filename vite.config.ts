import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    }
  },
  resolve: {
    alias: {
      '@pdfme/common': resolve(__dirname, '../packages/common/dist'),
      '@pdfme/converter': resolve(__dirname, '../packages/converter/dist'),
      '@pdfme/generator': resolve(__dirname, '../packages/generator/dist'),
      '@pdfme/schemas': resolve(__dirname, '../packages/schemas/dist'),
      '@pdfme/ui': resolve(__dirname, '../packages/ui/dist'),
      '@pdfme/manipulator': resolve(__dirname, '../packages/manipulator/dist')
    }
  }
});