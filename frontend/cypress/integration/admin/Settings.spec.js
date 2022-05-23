/// <reference types="cypress" />

describe('admin login page', () => {
    const username = 'username123'
    const password = 'password123'

    beforeEach(() => {
        cy.intercept("GET", "/api/product", { fixture: "products.json" })
        cy.intercept("PUT", "/api/user/update/name/", (req) => {
            if (req.body.password == password){
                req.reply({ statusCode: 200 })
            } else {
                req.reply({ body: {
                    password: ['Incorrect password.']
                }, statusCode: 400 })
            }
        })

        cy.visit('/admin')
        cy.intercept("POST", "/api/token", (req) => {
            if (req.body.username == username && req.body.password == password){
                req.reply({ body: {
                    access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1MzIyMDA4MSwiaWF0IjoxNjUzMTMzNjgxLCJqdGkiOiJlZjNlODBiZGQ5ZmQ0MDBlYjdjNjMyNTVlOGVjM2IwZCIsImlkIjo0LCJlbWFpbCI6InRoZWZpc2hlcm1hbnNjYWZlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidGZjX3N0YWZmIn0.DBJWrIOBwUfn3GrJ1oGPJGSIM0DWLQT5y9ixF30j5no',
                    refresh: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzMTM1NDgxLCJpYXQiOjE2NTMxMzM2ODEsImp0aSI6IjFiNDVkYmZlNDAyMDQwYzliYWVlMmQ5ZWM1ZWRjMzJiIiwiaWQiOjQsImVtYWlsIjoidGhlZmlzaGVybWFuc2NhZmVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZmNfc3RhZmYifQ.hLOjO83E9Wbj8TH0WsNaSHiC2lKFHdj_Q9kveOb6KRw'
                }, statusCode: 200 })
            } else {
                req.reply({ statusCode: 401 })
            }
        })
        cy.get('[placeholder="Enter username"]').type(username)
        cy.get('[placeholder="Enter password"]').type(password)
        cy.contains(/^(login)$/i).click()
        cy.contains(/settings/i).click()
    })

    it('prepopulates email and username field', () => {
        cy.get('input[type="email"]').should('have.value', 'thefishermanscafe@gmail.com')
        cy.get('input[name="username"]').should('have.value', 'tfc_staff')
    })


    it('allows successful update of admin user information', () => {
        const new_email = 'thefishermanscafe@gmail.com'
        cy.get('input[type="email"]').clear()
        cy.get('input[type="email"]').type(new_email)
        cy.get('input[name="username"]').clear()
        cy.get('input[name="username"]').type(username)
        cy.get('input[name="password"]').type(password)
        cy.contains(/save changes/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/successfully/i).should('be.visible')
    })

    it('fails to update of admin user information with invalid credentials', () => {
        const wrong_password = 'wrongpassword'
        cy.get('input[name="password"]').type(wrong_password)
        cy.contains(/save changes/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/error/i).should('be.visible')
    })
})