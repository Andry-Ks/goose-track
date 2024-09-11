"use strict";
const backendUrl = Cypress.env('backendUrl');
const apiUrl = `${backendUrl}/user/register`;

const validUserName = `UN${Math.floor(Math.random() * 1000)}`;
const validEmail = `User_${Date.now()}@example.com`;
const validPassword = `Aa12${Math.floor(Math.random() * 1000)}`;

const invalidUserName = 'A';
const invalidEmail = '.test@example.com';
const invalidPassword = '12345';

// describe('Positive user registration API Tests', () => {
//   it('Positive register test', () => {
//     cy.request({
//       method: 'POST',
//       url: apiUrl,
//       body: {
//         name: validUserName,
//         email: validEmail,
//         password: validPassword
//       },
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then((response) => {
//       expect(response.status).to.eq(201);
//     });
//   });
// });

describe('Negative user registration API Tests', () => {
  it('Register with invalid password', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name: validUserName,
        email: validEmail,
        password: invalidPassword
      },
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Register with invalid name', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name: invalidUserName,
        email: validEmail,
        password: validPassword
      },
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Register with long name', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name: 'Qwertyuiopasdfghj',
        email: validEmail,
        password: validPassword
      },
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Register with invalid email', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name: validUserName,
        email: invalidEmail,
        password: validPassword
      },
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Register with Cyrillic letters in the name of email', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name: validUserName,
        email: 'пошта@ukr.net',
        password: validPassword
      },
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Register with missing password', () => {
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: {
        name: validUserName,
        email: validEmail,
        password: ''
      },
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // it('Register with password containing spaces', () => {
  //   cy.request({
  //     method: 'POST',
  //     url: apiUrl,
  //     body: {
  //       name: validUserName,
  //       email: validEmail,
  //       password: 'Pass 1234'
  //     },
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     failOnStatusCode: false
  //   }).then((response) => {
  //     expect(response.status).to.eq(400);
  //   });
  // });

  // it('Register with incorrect method', () => {
  //   cy.request({
  //     method: 'PATCH',
  //     url: apiUrl,
  //     body: {
  //       name: validUserName,
  //       email: validEmail,
  //       password: validPassword
  //     },
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     failOnStatusCode: false
  //   }).then((response) => {
  //     expect(response.status).to.eq(405); //The error is not being handled by the server. Developers need to be informed.
  //   });
  // });

});