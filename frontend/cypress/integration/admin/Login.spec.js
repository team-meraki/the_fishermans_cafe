/// <reference types="cypress" />

describe('admin login page', () => {
    const username = 'username123'
    const password = 'password123'

    beforeEach(() => {
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
        cy.intercept("GET", "/api/product", { fixture: "products.json" })
    })

    it('allows successful login with valid credentials', () => {
        cy.get('[placeholder="Enter username"]').type(username)
        cy.get('[placeholder="Enter password"]').type(password)
        cy.contains(/^(login)$/i).click()
        cy.contains(/log out/i).should('exist')
    })

    it('fails to log in with invalid credentials', () => {
        cy.get('[placeholder="Enter username"]').type('some other username')
        cy.get('[placeholder="Enter password"]').type('some other password')
        cy.contains(/^(login)$/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/incorrect/i).should('be.visible')
    })

    it('is able to log out', () => {
        cy.get('[placeholder="Enter username"]').type(username)
        cy.get('[placeholder="Enter password"]').type(password)
        cy.contains(/^(login)$/i).click()
        cy.intercept("POST", "/api/token/blacklist", { statusCode: 200 })
        cy.contains(/log out/i).click()
        cy.contains(/admin login/i).should('exist')
    })
})