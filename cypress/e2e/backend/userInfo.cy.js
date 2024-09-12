"use strict";
const backendUrl = Cypress.env('backendUrl');
const apiUrl = `${backendUrl}/user/info`;

describe("Get user info test", () => {
  let accessToken;
  before(() => {
      cy.loginAndGetToken().then((token) => {
      accessToken = token;
      });
  });

    it ("Get info", () => {
        cy.request({
            method: 'GET',
            url: `${backendUrl}/user/info`,
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
            url: `${backendUrl}/user/info`,
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
            url: `${backendUrl}/user/info`,
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