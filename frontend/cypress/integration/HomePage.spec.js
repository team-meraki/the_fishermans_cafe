/// <reference types="cypress" />

describe('landing page', () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/cafeinfo", { fixture: "cafeinfo.json" })
      
      cy.intercept("GET", "/api/product", { fixture: "products.json" })
      
      cy.intercept("GET", "/api/testimonial", { fixture: "testimonials.json" })

      cy.intercept(/https:\/\/maps.googleapis.com\/.*/, { statusCode: 200 })
      
      cy.visit('/')
    })

    it('scrolls down the footer when contact nav link is clicked', () => {
      cy.contains('Contact').click()
      cy.window().its('scrollY').should('not.equal', 0) 
    })

    it('successfuly sends suggestion form with correct inputs', () => {
      const newSuggestion = {
        name : "Person5",
        email : "person5@email.com",
        message : "Well done!"
      }

      cy.intercept("POST", "/api/testimonial", (req) => {
        expect(req.body).to.include(newSuggestion)
        req.reply({
          statusCode: 201,
          body: req.body
        })
      })

      cy.intercept("POST", "api/recaptcha", async (req) => {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          body: JSON.stringify({
            'secret': '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
            'response': req.body['captcha_value'],
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        req.reply({
          statusCode: 200,
          body: { success : true }
        })
      })

      const stub = cy.stub()  
      cy.on('window:alert', stub)

      cy.get('input[type="text"]').type(newSuggestion.name, { force: true })
      cy.get('input[type="email"]').type(newSuggestion.email, { force: true })
      cy.get('textarea.form-control').type(newSuggestion.message, { force: true })
      cy.confirmCaptcha()
      
      cy.contains('Submit').click({ force: true })
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Suggestion successfully sent!')      
      })  
      cy.get('input[type="text"]').should('have.value', "")
      cy.get('input[name="email"]').should('have.value', "")
      cy.get('textarea.form-control').should('have.value', "")
      
  
    })

    it('fails to send suggestion form with invalid email field', () => {
      cy.intercept("POST", "api/recaptcha", async (req) => {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          body: JSON.stringify({
            'secret': '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
            'response': req.body['captcha_value'],
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        req.reply({
          statusCode: 200,
          body: { success : true }
        })
      })

      cy.get('input[type="email"]').type("justaninvalidemail", { force: true })
      cy.get('textarea.form-control').type("A valid message", { force: true })
      cy.confirmCaptcha()
      cy.contains('Submit').click({ force: true })
      cy.get('input[type="email"]:invalid').invoke('prop', 'validationMessage')
      .should('equal', "Please include an '@' in the email address. 'justaninvalidemail' is missing an '@'.")
      cy.get('input[name="email"]').should('have.value', "justaninvalidemail")
      cy.get('textarea.form-control').should('have.value', "A valid message")
    })

    it('fails to send suggestion form with an empty message field', () => {
      cy.intercept("POST", "api/recaptcha", async (req) => {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          body: JSON.stringify({
            'secret': '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',
            'response': req.body['captcha_value'],
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        req.reply({
          statusCode: 200,
          body: { success : true }
        })
      })

      cy.get('input[type="email"]').type("valid@email.com", { force: true })
      cy.confirmCaptcha()
      cy.contains('Submit').click({ force: true })
      cy.get('textarea.form-control:invalid').invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
      cy.get('input[name="email"]').should('have.value', "valid@email.com")
      cy.get('textarea.form-control').should('have.value', "")
    })

})