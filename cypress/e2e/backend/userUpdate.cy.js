"use strick";
const backendUrl = Cypress.env('backendUrl');
const apiUrl = `${backendUrl}/user/update`;

const validEmail = Cypress.env('validEmail');
const validPassword = Cypress.env('validPassword');

// describe("Positive update user test", () => {
//     let accessToken;
//     before(() => {
//         cy.request({
//             method: 'POST',
//             url: `${backendUrl}/user/login`,
//             body: {
//                 email: validEmail,
//                 password: validPassword,
//             },
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             accessToken = response.body.data.accessToken;
//         });
//     });

//     it("Update user info", () => {
//         cy.request({
//             method: 'PATCH',
//             url: apiUrl,
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//             body: {
//                 name: `TestUser_${Math.floor(Math.random() * 100)}`,
//                 phone: `+3801122277${Math.floor(Math.random() * 100)}`,
//                 birthday: `2000-11-${Math.floor(Math.random() * 31)}`,
//                 skype: `Nick_${Math.floor(Math.random() * 100)}`,
//             },
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//         });
//     });
// });

describe("Negative update user test", () => {
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
                expect(response.status).to.eq(200);
                accessToken = response.body.data.accessToken;
            });
        });

const invalidNames = ["", "A", "ThisIsAReallyLong"];

invalidNames.forEach((name) => {
    it("Update user info with invalid names", () => {
            cy.request({
                method: 'PATCH',
                url: apiUrl,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: {
                    name: name,      
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400, `Failed on name: "${name}"`);
            });
        });
    });
    
});