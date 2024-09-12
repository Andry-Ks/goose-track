"use strict";
const backendUrl = Cypress.env('backendUrl');

describe ("Update task data", () => {
    let accessToken;
    before(() => {
        cy.loginAndGetToken().then((token) => {
        accessToken = token;
        });
    });

        let taskId;
        before(() => {
        const newTask = {
            title: "toDo Update",
            start: "9-35",
            end: "14-55",
            priority: "low",
            category: "to-do",
            date: "2024-09-20",
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

    it ("Positive test. Update task", () => {
        cy.request({
            method: 'PUT',
            url: `${backendUrl}/task/${taskId}`,
            body: {
                title: "Updated Task",
                start: "10-00",
                end: "15-00",
                priority: "high",
                category: "Done",
                date: "2024-09-20"
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it ("Delete task", () => {
        cy.request({
            method: 'DELETE',
            url: `${backendUrl}/task/${taskId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it("Negative test. Try to update the task after delete", () => {
        cy.request({
            method: 'PUT',
            url: `${backendUrl}/task/${taskId}`,
            body: {
                title: "Task After Delete",
                start: "11-00",
                end: "16-00",
                priority: "low",
                category: "done",
                date: "2024-09-20"
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404); 
        });
    });

});