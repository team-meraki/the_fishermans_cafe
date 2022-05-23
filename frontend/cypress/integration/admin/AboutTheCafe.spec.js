/// <reference types="cypress" />

describe('admin about page', () => {

    let newCafeInfo = {
        id : 1,
        logo : "http://127.0.0.1:8000/media/logo/tfcafe_logo.png",
        location : "Sts. Peter and Paul Parish, Binaobao, Bantayan Island, Cebu, Philippines",
        description: "This is a description",
        announcement: "This is an announcement",
        table_accommodation: "This provides table accommodation",
        delivery_info: "This provides delivery info",
        schedule : "new schedule",
        facebook : "https://www.facebook.com/thefishermanscafe/",
        contact_number : "09123456789"
    }

    beforeEach(() => {
        cy.intercept("GET", "/api/product", { fixture: 'products.json' })
        cy.intercept("GET", "/api/cafeinfo", { fixture: 'cafeinfo.json' })

        cy.visit('/admin')
        const username = 'username123'
        const password = 'password123'
        cy.intercept("POST", "/api/token", (req) => {
            if (req.body.username == username && req.body.password == password){
                req.reply({
                    access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1MzIyMDA4MSwiaWF0IjoxNjUzMTMzNjgxLCJqdGkiOiJlZjNlODBiZGQ5ZmQ0MDBlYjdjNjMyNTVlOGVjM2IwZCIsImlkIjo0LCJlbWFpbCI6InRoZWZpc2hlcm1hbnNjYWZlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGZjX3N0YWZmIn0.DBJWrIOBwUfn3GrJ1oGPJGSIM0DWLQT5y9ixF30j5no',
                    refresh: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzMTM1NDgxLCJpYXQiOjE2NTMxMzM2ODEsImp0aSI6IjFiNDVkYmZlNDAyMDQwYzliYWVlMmQ5ZWM1ZWRjMzJiIiwiaWQiOjQsImVtYWlsIjoidGhlZmlzaGVybWFuc2NhZmVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZmNfc3RhZmYifQ.hLOjO83E9Wbj8TH0WsNaSHiC2lKFHdj_Q9kveOb6KRw'
                })
            }
        })
        cy.get('[placeholder="Enter username"]').type(username)
        cy.get('[placeholder="Enter password"]').type(password)
        cy.contains(/^(login)$/i).click()
        cy.contains(/about the cafe/i).click()
    })

    it('shows about data to admin', () => {
        cy.contains(/this is a description/i).should('exist')
        cy.contains(/this is an announcement/i).should('exist')
        cy.contains(/this provides table accommodation/i).should('exist')
        cy.contains(/this provides delivery info/i).should('exist')
        cy.contains(/Sts. Peter and Paul Parish, Binaobao, Bantayan Island, Cebu, Philippines/i).should('exist')
        cy.contains(/Monday - Sunday 9:00 AM - 7:00 PM/i).should('exist')
    })

    it('allows editing of cafe info', () => {
        cy.get('textarea[name=schedule]').type('new schedule')
        cy.intercept("PATCH", "/api/cafeinfo", { statusCode: 200 })
        cy.intercept("GET", "/api/cafeinfo", { body: newCafeInfo })
        cy.contains(/save changes/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/successfully/i).should('be.visible')

        cy.contains(/new schedule/i).should('exist')
    })

    it('fails to edit product with bad request', () => {
        cy.get('textarea[name=schedule]').type(' ')
        cy.intercept("PATCH", "/api/cafeinfo", { body: {
            schedule: ['This field may not be blank.']
        }, statusCode: 400 })
        cy.contains(/save changes/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/error/i).should('be.visible')
        cy.contains(/new schedule/i).should('not.exist')
        cy.contains(/Monday - Sunday 9:00 AM - 7:00 PM/i).should('exist')
    })
})