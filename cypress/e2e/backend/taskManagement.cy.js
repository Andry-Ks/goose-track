"use strict";
const backendUrl = Cypress.env('backendUrl');

describe("Create and delete task tests", () => {
    let accessToken;
    before(() => {
        cy.loginAndGetToken().then((token) => {
        accessToken = token;
        });
    });
   
    let taskId;
    it("Create task", () => {
      const newTask = {
        title: "toDo Test",
        start: "9-00",
        end: "14-30",
        priority: "low",
        category: "to-do",
        date: "2024-09-21",
      };
  
      cy.request({
        method: 'POST',
        url: `${backendUrl}/task`,
        body: newTask,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(201); //Created
        expect(response.body).to.have.property('_id');
        taskId = response.body._id;
      });
    });
  
    it("Delete task", () => {
      cy.request({
        method: 'DELETE',
        url: `${backendUrl}/task/${taskId}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200); //OK
      });
    });

    it("Delete a non-exist task", () => {
        cy.request({
            method: 'DELETE',
            url: `${backendUrl}/task/{invalidtaskid}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404); // Not Found
        });
    });

});