import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '2pgt7f',
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
  },
});
