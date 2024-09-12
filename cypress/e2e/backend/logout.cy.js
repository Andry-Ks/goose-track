"use strict";
const backendUrl = Cypress.env('backendUrl');
const apiUrl = `${backendUrl}/user/logout`;

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

describe("User logout test", () => {
  let accessToken;
  before(() => {
      cy.loginAndGetToken().then((token) => {
      accessToken = token;
      });
  });
  
    it("Logout user", () => {
      cy.request({
        method: 'GET',
        url: apiUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      });
    });

    it("Logout user again with the same token", () => {
      cy.request({
          method: 'GET',
          url: apiUrl,
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.eq(401); //(Unauthorized)
      });
  });

});