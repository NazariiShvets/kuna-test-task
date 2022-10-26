import { defineConfig, mergeConfig } from 'vite';

//@ts-expect-error Missing typings on .js
import config from 'vite-config';

export default defineConfig(
  mergeConfig(config, {
    build: {
      assetsDir: 'resourses'
    },
    server: {
      port: 8080
    }
  })
);
