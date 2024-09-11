"use strict";
const backendUrl = Cypress.env('backendUrl');
const apiUrl = `${backendUrl}/user/info`;

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

describe("Get user info test", () => {
    let accessToken;
    before(() => {
      cy.request({
        method: 'POST',
        url: `${backendUrl}/user/login`,
        body: {
          email: validEmail,
          password: validPassword,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        accessToken = response.body.data.accessToken
      });
    });

    it ("Get info", () => {
        cy.request({
            method: 'GET',
            url: apiUrl,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it("Get info with invalid token", () => {
        cy.request({
            method: 'GET',
            url: apiUrl,
            headers: {
                'Authorization': 'Bearerinvalid_token',
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401); //Unauthorized
        });
    });

    it("Get info without token", () => {
        cy.request({
            method: 'GET',
            url: apiUrl,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    after(() => {
        cy.request({
          method: 'GET',
          url: `${backendUrl}/user/logout`,
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });

});