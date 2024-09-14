const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      backendUrl: 'https://goose-tracker-backend.p.goit.global',
      frontendUrl: 'https://goose-track-qa.netlify.app/',

      validEmail: process.env.CYPRESS_VALID_EMAIL,
      validPassword: process.env.CYPRESS_VALID_PASSWORD,
    },
    viewportWidth: 1440,
    viewportHeight: 900,
  },
});
