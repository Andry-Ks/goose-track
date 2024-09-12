"use strict";
const backendUrl = Cypress.env('backendUrl');

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

describe("Refresh token test", () => {
    let refreshToken;
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
        refreshToken = response.body.data.refreshToken;
        accessToken = response.body.data.accessToken;
      });
    });

    it("Positive test. Refresh access token", () => {
        cy.request({
          method: 'POST',
          url: `${backendUrl}/user/refresh`,
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.property('accessToken');
          expect(response.body.data).to.have.property('refreshToken');
        });
      });

      it("Logout", () => {
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
        
        it("Negative test. Refresh after logout", () => {
          cy.request({
            method: 'POST',
            url: `${backendUrl}/user/refresh`,
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

});