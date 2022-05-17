/// <reference types="cypress" />

describe('gallery page', () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/cafeinfo", { fixture: "cafeinfo.json" })
        cy.intercept("GET", "/api/featured-product", { fixture: "featured_products.json" })
        cy.intercept("GET", "/api/featured-review", { fixture: "featured_reviews.json" })
        cy.intercept("GET", "/api/testimonial", { fixture: "testimonials.json" })
        cy.intercept("GET", "/api/gallery", { fixture: "gallery.json" })
        cy.intercept(/https:\/\/maps.googleapis.com\/.*/, { statusCode: 200 })
        cy.visit('/')
        cy.contains(/gallery/i).click()
    })

    it('has cafe gallery displayed on first visit', () => {
        cy.get(".card-img-top.img-content").should('have.length', 4)
    })
})
