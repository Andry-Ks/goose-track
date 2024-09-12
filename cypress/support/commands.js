// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('loginAndGetToken', () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('backendUrl')}/user/login`,
        body: {
            email: Cypress.env('validEmail'),
            password: Cypress.env('validPassword'),
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body.data.accessToken;
    });
});