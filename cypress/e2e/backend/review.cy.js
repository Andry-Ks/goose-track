"use strict";
const backendUrl = Cypress.env('backendUrl');

describe("Get reviews", () => {
    it("Get list of reviews", () => {
        cy.request({
            method: 'GET',
            url: `${backendUrl}/review/`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            console.log("Response Body:", response.body);
        });
    });
    
});
