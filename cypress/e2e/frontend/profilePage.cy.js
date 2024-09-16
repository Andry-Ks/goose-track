"use strict";
const frontendUrl = Cypress.env('frontendUrl');

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

describe ("Positive test. Update user data", () => {
    it ("Edit user profile", () => {
        const validName = `TestUser_${Math.floor(Math.random() * 100)}F`;
        const validPhone = `+3801122233${Math.floor(Math.random() * 100)}`;
        const validSkype = `Nick_${Math.floor(Math.random() * 100)}F`;
        cy.visit(frontendUrl);
        cy.loginFrontend(validEmail, validPassword);
        cy.get('a[href="/account"]').click();

        cy.intercept('GET', '**/user/info').as('getUserInfo'); 
        cy.wait('@getUserInfo'); // Wait for the request to complete
        
        cy.get('input[name="name"]').clear({ force: true }).type(validName).should('have.value', validName);
        cy.get('input[name="phone"]').clear({ force: true }).type(validPhone).should('have.value', validPhone);
        cy.get('input[name="skype"]').clear({ force: true }).type(validSkype).should('have.value', validSkype);



    });

    // after (() => {
    //     cy.contains('span', 'Log out').click();
    // });
});