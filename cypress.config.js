const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      backendUrl: 'https://goose-tracker-backend.p.goit.global',

      validEmail: process.env.CYPRESS_VALID_EMAIL,
      validPassword: process.env.CYPRESS_VALID_PASSWORD,
    },
  },
});
