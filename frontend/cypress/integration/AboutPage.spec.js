/// <reference types="cypress" />

describe('about page', () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/cafeinfo", { fixture: "cafeinfo.json" })
        cy.intercept("GET", "/api/featured", { fixture: "featured_products.json" })
        cy.intercept("GET", "/api/testimonial", { fixture: "testimonials.json" })
        cy.intercept("GET", "/api/about", { fixture: "about.json" })
        cy.intercept(/https:\/\/maps.googleapis.com\/.*/, { statusCode: 200 })
        cy.visit('/')
        cy.contains(/about/i).click()
    })

    it('shows relevant cafe about data', () => {
        cy.contains(/this is a description/i).should('exist')
        cy.contains(/this is an announcement/i).should('exist')
        cy.contains(/this provides table accommodation/i).should('exist')
        cy.contains(/this provides delivery info/i).should('exist')
    })

})