/// <reference types="cypress" />

describe('admin gallery page', () => {
    let gallery_list
    let add1
    let delete1
    let newPhoto = {
        id : 5,
        image : "http://127.0.0.1:8000/media/gallery/testphoto.png",
    }
    
    before(() => {
        cy.fixture('gallery.json').then(photos => {
            gallery_list = photos
            add1 = JSON.parse(JSON.stringify(photos))
            add1.push(newPhoto)
            delete1 = photos.filter(photo => photo.id != 1)
        })
    })

    beforeEach(() => { 
        cy.intercept("GET", "/api/gallery", { body: gallery_list })
        cy.intercept("POST", "/api/gallery", { statusCode: 201 })
        cy.intercept("DELETE", "/api/gallery/*", { statusCode: 204 })
        cy.visit('/admin/all-gallery')
    })

    it('allows addition of photos', () => {
        cy.contains(/add/i).should('exist')
        cy.contains(/add/i).click()
        cy.get('input[name="image"]').should('exist')
        cy.contains(/close/i).should('exist')
        cy.contains(/close/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 4)
        })

        cy.contains(/add/i).click()
        cy.get('input[name="image"]').should('exist')
        cy.intercept("GET", "/api/gallery", { body: add1 })
        cy.contains(/save/i).click()
        
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 5)
            cy.contains(/^1$/i).should('exist')
        })        
    })

    it('fails on adding new photo with bad request', () => {
        cy.contains(/add/i).click()
        cy.intercept("POST", "/api/gallery", { statusCode: 400 })
        cy.contains(/save/i).click()

        cy.get('div[role="alert"]').should('exist')
        cy.contains(/invalid/i).should('be.visible')
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 4)
        })
    })
    
    it('allows deleting of photos', () => {
        cy.get('img[alt="Delete Icon"]').first().click()
        cy.contains(/^(delete)$/i).should('exist')
        cy.contains(/cancel/i).should('exist')
        cy.contains(/cancel/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 4)
        })
        
        cy.get('img[alt="Delete Icon"]').first().click()
        cy.intercept("GET", "/api/gallery", { body: delete1 })
        cy.contains(/^(delete)$/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 3)
            cy.contains(/^1$/i).should('not.exist')
        })
    })

    it('fails on deleting unfound photo', () => {
        cy.intercept("DELETE", "/api/gallery/*", { statusCode: 404 })
        cy.get('img[alt="Delete Icon"]').first().click()
        cy.contains(/^(delete)$/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/not found/i).should('be.visible')
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 4)
        })
    })
})