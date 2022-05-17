/// <reference types="cypress" />

describe('admin product page', () => {
    let product_list
    let add1
    let delete1
    let edit1
    let newProduct = {
        id : 6,
        name : 'Test',
        category : "drink",
        price : "60.00",
        image : "http://127.0.0.1:8000/media/products/testproduct.png",
        last_modified : "2022-03-20T04:15:54.579776Z"
    }
    
    before(() => {
        cy.fixture('products.json').then((products) => {
            product_list = products
            add1 = JSON.parse(JSON.stringify(products))
            add1.push(newProduct)
            delete1 = products.filter(product => product.id != 1)
            edit1 = delete1.map(product => {
                if(product.id === 2)
                    return {...product, name: 'Test'}
                return product
            })
        })
    })

    beforeEach(() => { 
        cy.intercept("GET", "/api/product", { body: product_list })
        cy.intercept("POST", "/api/product", { statusCode: 201 })
        cy.intercept("DELETE", "/api/product/*", { statusCode: 204 })
        cy.visit('/admin/all-products')
    })

    it('filters products based on category', () => {
        cy.contains(/filter/i).should('exist')
        cy.contains(/^(all)$/i).click()
        cy.contains(/^(meals)$/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 2)
        })
        cy.contains(/^(meals)$/i).click()
        cy.contains(/^(drinks)$/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 2)
        })
        cy.contains(/^(drinks)$/i).click()
        cy.contains(/^(desserts)$/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 1)
        })
    })

    it('allows addition of products', () => {
        cy.contains(/add/i).click()
        cy.contains(/category/i).should('exist')
        cy.contains(/meal/i).should('exist')
        cy.contains(/drink/i).should('exist')
        cy.contains(/dessert/i).should('exist')
        cy.get('input[name="name"]').should('exist')
        cy.get('input[name="price"]').should('exist')
        cy.get('input[name="image"]').should('exist')
        cy.contains(/cancel/i).should('exist')
        cy.contains(/cancel/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 5)
        })

        cy.contains(/add/i).click()
        cy.get('input[value="meal"]').should('be.checked')
        cy.contains(/drink/i).click()
        cy.get('input[value="drink"]').should('be.checked')
        cy.get('input[name="name"]').type(newProduct.name)
        cy.get('input[name="price"]').type(newProduct.price)
        
        cy.intercept("GET", "/api/product", { body: add1})
        cy.contains(/save product/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/added/i).should('be.visible')
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 6)
        })

        cy.contains(/test/i).should('exist')
    })

    it('fails on adding new product with bad request', () => {
        cy.contains(/add/i).click()
        cy.get('input[name="name"]').clear() 
        cy.get('input[name="name"]').type(' ')
        cy.get('input[name="price"]').clear() 
        cy.get('input[name="price"]').type('0')
        cy.intercept("POST", "/api/product", { body: {
            name: ['This field may not be blank.'],
            price: ['A valid number is required.']
        }, statusCode: 400 })

        cy.contains(/save product/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/error/i).should('be.visible')
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 5)
        })
    })
    
    it('allows deleting of products', () => {
        cy.get('img[alt="Delete Icon"]').first().click()
        cy.contains(/^(delete)$/i).should('exist')
        cy.contains(/cancel/i).should('exist')
        cy.contains(/cancel/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 5)
        })
        
        cy.get('img[alt="Delete Icon"]').first().click()
        cy.intercept("GET", "/api/product", { body: delete1})
        cy.contains(/^(delete)$/i).click()
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 4)
        })

        cy.contains(/product1/i).should('not.exist')
    })

    it('fails on deleting unfound product', () => {
        cy.intercept("DELETE", "/api/product/*", { statusCode: 404 })
        cy.get('img[alt="Delete Icon"]').first().click()
        cy.contains(/^(delete)$/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/not found/i).should('be.visible')
        cy.get('tbody').within(() => {
            cy.get('tr').should('have.length', 5)
        })
    })

    it('allows editing of products', () => {
        cy.get('img[alt="Edit Icon"]').first().click()
        cy.contains(/category/i).should('exist')
        cy.contains(/meal/i).should('exist')
        cy.contains(/drink/i).should('exist')
        cy.contains(/dessert/i).should('exist')
        cy.get('input[name="name"]').should('exist')
        cy.get('input[name="price"]').should('exist')
        cy.get('input[name="image"]').should('exist')
        cy.contains(/cancel/i).should('exist')

        const product1 = product_list.find(product => product.id == 1)
        cy.get(`input[value=${product1.category}]`).should('be.checked')
        cy.get('input[name="name"]').should('have.value', product1.name)
        cy.get('input[name="price"]').should('have.value', product1.price)

        cy.get('input[name="name"]').type('Test')
        cy.intercept("PATCH", "/api/product/*", { statusCode: 200 })
        cy.intercept("GET", "/api/product", { body: edit1 })
        cy.contains(/save changes/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/edited/i).should('be.visible')

        cy.contains(/test/i).should('exist')
    })

    it('fails to edit product with bad request', () => {
        cy.get('img[alt="Edit Icon"]').first().click()          
        cy.get('input[name="name"]').clear() 
        cy.get('input[name="name"]').type(' ')
        cy.get('input[name="price"]').clear() 
        cy.get('input[name="price"]').type('0')
        cy.intercept("PATCH", "/api/product/*", { body: {
            name: ['This field may not be blank.'],
            price: ['A valid number is required.']
        }, statusCode: 400 })

        cy.contains(/save changes/i).click()
        cy.get('div[role="alert"]').should('exist')
        cy.contains(/error/i).should('be.visible')

        cy.contains(/test/i).should('not.exist')
    })
})