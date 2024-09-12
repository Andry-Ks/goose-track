"use strict";
const backendUrl = Cypress.env('backendUrl');

describe("User logout test", () => {
  let accessToken;
  before(() => {
      cy.loginAndGetToken().then((token) => {
      accessToken = token;
      });
  });
  
    it("Positive test. Logout user", () => {
      cy.request({
        method: 'GET',
        url: `${backendUrl}/user/logout`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      });
    });

    it("Negative test. Logout user again with the same token", () => {
      cy.request({
          method: 'GET',
          url: `${backendUrl}/user/logout`,
          headers: {
              'Authorization': `Bearer ${accessToken}`,
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.eq(401); //(Unauthorized)
      });
  });

});