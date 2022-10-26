/// <reference types="vitest" />

import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig['test']} */
const test = {
  globals: true,
  environment: 'jsdom',
  // setupFiles: './tests/setup.ts',
  coverage: {
    all: true,
    reporter: ['lcov'],
  }
}

/** @type {import('vite').UserConfig['plugins']} */
const plugins = [
  tsconfigPaths(),

  checker({ typescript: true }),

  react(),
]

/** @type {import('vite').UserConfig} */
const base = {
  test,

  plugins
};


export default base;
