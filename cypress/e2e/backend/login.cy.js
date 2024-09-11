"use strict";
const backendUrl = Cypress.env('backendUrl');
const apiUrl = `${backendUrl}/user/login`;

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

const wrongEmail = 'wrongemail123@gmail.com';
const wrongPassword = 'Wrongpass';

describe ("Positive login test", () => {
    it ("Login", () => {
        cy.request ({
            method: 'POST',
            url: apiUrl,
            body: {
                email: validEmail,
                password: validPassword,
            },
          }).then((response) => {
            expect(response.status).to.eq(200)
        });
    });
});

describe("Negative login tests", () => {
    it("Login with wrong email", () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                email: wrongEmail,
                password: validPassword,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("Login with wrong password", () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                email: validEmail,
                password: wrongPassword,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("Login with missing password", () => {
        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                email: validEmail,
                password: "",
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(409);
        });
    });

    // it("Login with incorrect method", () => {
    //     cy.request({
    //         method: 'PATCH',
    //         url: apiUrl,
    //         body: {
    //             email: validEmail,
    //             password: validPassword,
    //         },
    //         failOnStatusCode: false
    //     }).then((response) => {
    //         expect(response.status).to.eq(405); //The error is not being handled by the server. Developers need to be informed.
    //     });
    // });
    
});