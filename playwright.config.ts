import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    baseURL: 'http://demowebshop.tricentis.com',
  },
  testDir: './Tests',
});