// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

//Backend commands
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

//Frontend commands
Cypress.Commands.add('loginFrontend', (email, password) => {
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});