"use strict";
const backendUrl = Cypress.env('backendUrl');
const apiUrl = `${backendUrl}/user/logout`;

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

describe("User logout test", () => {
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