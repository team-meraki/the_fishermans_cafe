/// <reference types="cypress" />

describe('menu page', () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/cafeinfo", { fixture: "cafeinfo.json" })
        cy.intercept("GET", "/api/featured", { fixture: "featured_products.json" })
        cy.intercept("GET", "/api/testimonial", { fixture: "testimonials.json" })
        cy.intercept("GET", "/api/product", { fixture: "products.json" })
        cy.intercept(/https:\/\/maps.googleapis.com\/.*/, { statusCode: 200 })
        cy.visit('/')
        cy.contains(/menu/i).click()
    })

    it('shows meal category products on first visit', () => {
        cy.get('.active.show').within(() => {
            cy.get('.menu-card-wrapper[data-testid="product-card"]').should('have.length', 2)
        })
    })

    it('shows dessert category products after clicking dessert button', () => {
        cy.contains(/desserts/i).click({ force: true })
        cy.get('.active.show').within(() => {
            cy.get('.menu-card-wrapper[data-testid="product-card"]').should('have.length', 1)
        })
    })

    it('shows drink category products after clicking drink button', () => {
        cy.contains(/drinks/i).click({ force: true })
        cy.get('.active.show').within(() => {
            cy.get('.menu-card-wrapper[data-testid="product-card"]').should('have.length', 2)
        })
    })

    it('shows meal category products after clicking meal button', () => {
        cy.contains(/meals/i).click({ force: true })
        cy.get('.active.show').within(() => {
            cy.get('.menu-card-wrapper[data-testid="product-card"]').should('have.length', 2)
        })
    })

})