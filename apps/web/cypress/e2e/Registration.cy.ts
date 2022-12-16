describe('Registration page', () => {
   it('should allow users to navigate between pages', () => {
      cy.visit('/registration')

      // Navigate to the home page
      cy.getByCy('home-button').click()
      cy.location('pathname').should('eq', '/')

      // Go back to the registration page
      cy.go(-1)

      // Navigate to the email support page
      cy.getByCy('annotation').first().click()
      cy.location('pathname').should('eq', '/email-support')

      // Go back to the registration page
      cy.go(-1)

      // Navigate to the login page
      cy.getByCy('annotation').last().click()
      cy.location('pathname').should('eq', '/login')

      // Go back to the registration page
      cy.go(-1)
   })

   it('should validate required fields and enforce password strength requirements', () => {
      cy.visit('/registration')

      cy.getByCy('submit').click()

      cy.getByCy('input').should('have.length', 4)
      cy.getByCy('error').should('have.length', 4)

      /** ---- Name ---- */

      cy.contains('Name is required').should('be.visible')
      cy.getByCy('input').eq(0).type('John')
      cy.contains('Name is required').should('not.exist')

      cy.getByCy('error').should('have.length', 3)

      /** ---- Email ---- */

      cy.getByCy('input').eq(1).type('onlinelibraryapplication')
      cy.contains('Enter a valid email address').should('be.visible')

      cy.getByCy('input').eq(1).clear()
      cy.contains('Email is required').should('be.visible')

      cy.getByCy('input').eq(1).type('onlinelibraryapplication@')
      cy.contains('Enter a valid email address').should('be.visible')

      cy.getByCy('input').eq(1).clear().type('onlinelibraryapplication@gmail')
      cy.contains('Enter a valid email address').should('be.visible')

      cy.getByCy('input').eq(1).clear().type('onlinelibraryapplication@gmail.com')
      cy.contains('Enter a valid email address').should('not.exist')

      cy.getByCy('error').should('have.length', 2)

      /** -------- Password -------- */

      const passwordError = 'Password too weak (8 chars/1 lowercase/1 uppercase/1 digit)'

      cy.contains('Password is required').should('be.visible')

      cy.getByCy('input').eq(2).type('testing')
      cy.contains(passwordError).should('be.visible')

      cy.getByCy('input').eq(2).clear()
      cy.contains('Password is required').should('be.visible')

      cy.getByCy('input').eq(2).type('testing123')
      cy.contains(passwordError).should('be.visible')

      cy.getByCy('input').eq(2).clear().type('Testing123')
      cy.contains(passwordError).should('not.exist')

      cy.getByCy('error').should('have.length', 1)

      /** ---------------- Repeated password ---------------- */

      cy.contains('Repeated password is required').should('be.visible')

      cy.getByCy('input').eq(3).type('Testing1234')
      cy.contains('Passwords are different').should('be.visible')
      cy.getByCy('input').eq(3).clear().type('Testing123')

      cy.getByCy('error').should('have.length', 0)
   })
})
