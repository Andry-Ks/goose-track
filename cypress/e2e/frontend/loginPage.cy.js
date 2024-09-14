"use strict";
const frontendUrl = Cypress.env('frontendUrl');

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

// describe ("Positive login test", () => {
//     it ("Login with valid data", () => {
//         cy.visit(frontendUrl);
//         cy.get('a[href="/login"]').click();
//         cy.get('button[type="submit"]').should('be.visible');
//         cy.get('input[name="email"]').type(validEmail);
//         cy.get('input[name="password"]').type(validPassword);
//         cy.get('button[type="submit"]').click();
//     });

//     after (() => {
//         cy.contains('span', 'Log out').click();
//     });
// });

describe ("Negative login test", () => {
    const invalidEmails = [" ", ".automation@example.com", "automationexample.com", "test111@example.com"];
    invalidEmails.forEach((email) => {
    it (`Login with invalid email: ${email}`, () => {
        cy.visit(frontendUrl);
        cy.get('a[href="/login"]').click();
        cy.get('button[type="submit"]').should('be.visible');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(validPassword);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
    });
    })

});