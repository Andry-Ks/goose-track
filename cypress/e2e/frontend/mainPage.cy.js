"use strict";
const frontendUrl = Cypress.env('frontendUrl');

describe ("Main page", () => {
    it ("Visit main page", () => {
        cy.visit(frontendUrl);
        cy.get('a[href="/register"]').should('be.visible');
        cy.get('a[href="/login"]').should('be.visible');
    });

});