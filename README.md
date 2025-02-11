# Automated tests for task tracker GooseTrack

## Description
Automated frontend and backend tests for the GooseTrack task tracker, built with Cypress 🌲 JavaScript.

## Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: npm install

## Running Tests
- **Run all tests**: npx cypress run
- **Run a specific test**: npx cypress run --spec cypress/e2e/frontend/test-name.cy.js
- **Run in UI mode**: npx cypress open

## 📂 Project Structure
- 📁 **cypress/**
  - 📁 **e2e/** – test files  
    - 📁 **frontend/** – frontend tests  
    - 📁 **backend/** – backend tests  
  - 📁 **support/**  
    - 📄 commands.js – custom commands  
- 📁 **load-tests/** – load testing with Artillery  
- ⚙️ cypress.config.js – Cypress configurations