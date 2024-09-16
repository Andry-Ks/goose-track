"use strict";
const frontendUrl = Cypress.env('frontendUrl');

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

describe ("Open calendar page", () => {
    it ("Main functions", () => {
        cy.visit(frontendUrl);
        cy.loginFrontend(validEmail, validPassword);

        const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
        console.log(currentMonth);
        cy.get('.css-y0zn1c > .MuiBox-root > .MuiTypography-root').should('have.text', currentMonth); //checking the current month
        
        cy.get('.MuiList-root > :nth-child(2) > .MuiButtonBase-root').click(); //arrow >
        cy.get('.MuiList-root > :nth-child(1) > .MuiButtonBase-root').click(); //arrow <

        cy.get('.themeToggler__icon').click(); //changing the color theme
        cy.get('.themeToggler__icon').click(); //changing the color theme

        cy.get('button[aria-label="day"]').click();
        cy.get('button[aria-label="month"]').click();
    });

});