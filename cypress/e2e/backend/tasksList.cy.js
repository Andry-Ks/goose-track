"use strict";
const backendUrl = Cypress.env('backendUrl');

describe("Get list of tasks", () => {
    let accessToken;
    before(() => {
        cy.loginAndGetToken().then((token) => {
        accessToken = token;
        });
    });

    it("Positive test. Get tasks for a specific month and year", () => {
        cy.request({
            method: 'GET',
            url: `${backendUrl}/task/by-month`,
            qs: {
                year: 2024,
                month: 9
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        });
    });
   
    it("Negative test. Request without token", () => {
        cy.request({
            method: "GET",
            url: `${backendUrl}/task/by-month`,
            qs: {
                year: 2024,
                month: 9
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401); //Unauthorized
        });
    });

    it("Negative test. Request without year and month", () => {
        cy.request({
            method: "GET",
            url: `${backendUrl}/task/by-month`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            failOnStatusCode: false,
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(400); //Bad Request
        });
    });

});