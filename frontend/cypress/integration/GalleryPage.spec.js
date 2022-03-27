/// <reference types="cypress" />

describe('gallery page', () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/cafeinfo", { fixture: "cafeinfo.json" })
        
        cy.intercept("GET", "/api/product", { fixture: "products.json" })
        
        cy.intercept("GET", "/api/testimonial", { fixture: "testimonials.json" })

        cy.intercept("GET", "/api/gallery", { fixture: "gallery.json" })
        
        cy.visit('/')

        cy.contains(/gallery/i).click()


    })

    it('has cafe interior displayed on first visit', () => {
        cy.get(".card-img-top.img-content").should('have.length', 3)
    })

    it('has cafe interior displayed when inside button is clicked', () => {
        cy.contains(/inside/i).click({ force : true })
        cy.get(".card-img-top.img-content").should('have.length', 3)
    })

    it('has cafe exterior displayed when outside button is clicked', () => {
        cy.contains(/outside/i).click({ force : true })
        cy.get(".card-img-top.img-content").should('have.length', 1)
    })
})
