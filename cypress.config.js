import { defineConfig } from "cypress";
module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 20000,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      API_URL: 'http://localhost:3030',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
