import { API, SERVER_URL, TEST_USER } from '@online-library/config'

describe('Registration page', () => {
   beforeEach(() => {
      cy.visit('/registration')
   })

   it('should allow users to navigate between pages', () => {
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
      cy.getByCy('submit').click()

      cy.getByCy('input').should('have.length', 4)
      cy.getByCy('error').should('have.length', 4)

      /** ---- Name ---- */

      cy.contains('Name is required').should('be.visible')
      cy.getByCy('input').eq(0).type(TEST_USER.name)
      cy.contains('Name is required').should('not.exist')

      cy.getByCy('error').should('have.length', 3)

      /** ---- Email ---- */

      cy.getByCy('input').eq(1).type('testing')
      cy.contains('Enter a valid email address').should('be.visible')

      cy.getByCy('input').eq(1).clear()
      cy.contains('Email is required').should('be.visible')

      cy.getByCy('input').eq(1).type('testing@')
      cy.contains('Enter a valid email address').should('be.visible')

      cy.getByCy('input').eq(1).clear().type('testing@gmail')
      cy.contains('Enter a valid email address').should('be.visible')

      cy.getByCy('input').eq(1).clear().type(TEST_USER.email)
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

      cy.getByCy('input').eq(2).clear().type(TEST_USER.password)
      cy.contains(passwordError).should('not.exist')

      cy.getByCy('error').should('have.length', 1)

      /** ---------------- Repeated password ---------------- */

      cy.contains('Repeated password is required').should('be.visible')

      cy.getByCy('input').eq(3).type(`Testing1234`)
      cy.contains('Passwords are different').should('be.visible')
      cy.getByCy('input').eq(3).clear().type(TEST_USER.password)

      cy.getByCy('error').should('have.length', 0)
   })

   it('should validate whole registration flow', () => {
      cy.seedUser()

      const { name, email, password } = TEST_USER

      // Fill out form
      cy.getByCy('input').eq(0).type(name)
      cy.getByCy('input').eq(1).type(email)
      cy.getByCy('input').eq(2).type(password)
      cy.getByCy('input').eq(3).type(password)

      const { request, header, responses } = API['/api/user/auth/register'].post

      cy.intercept({
         method: request.method,
         url: `**/${request.url}`,
      }).as('register')

      // Submit form
      cy.getByCy('submit').click()

      // Assert that request body is correct
      cy.wait('@register').its('request.body').should('deep.equal', {
         name,
         email,
         password,
         repeatedPassword: password,
      })

      // Catch 409 error and allow it
      cy.on('uncaught:exception', allow409)

      // Assert that feedback header and message are correct
      cy.getByCy('apiFeedback-header').should('be.visible').should('have.text', header)
      cy.getByCy('apiFeedback-message').should('be.visible').should('have.text', responses[409])

      // Delete test user and close feedback popup
      cy.deleteTestUser()
      cy.getByCy('apiFeedback-button').should('be.visible').click()
      cy.getByCy('apiFeedback').should('not.exist')

      // Submit form again
      cy.getByCy('submit').click()

      // Assert that request is successful
      cy.wait('@register').its('response.statusCode').should('equal', 200)

      // Assert that feedback popup header and message are correct
      cy.getByCy('apiFeedback-header').should('be.visible').should('have.text', header)
      cy.getByCy('apiFeedback-message').should('be.visible').should('have.text', responses[200])

      // Close feedback popup
      cy.getByCy('apiFeedback-button').should('be.visible').click()
      cy.getByCy('apiFeedback').should('not.exist')

      // Get email preview URL
      const { method, url } = API['/api/testing/ethereal-email'].get.request
      cy.request({
         method,
         url: `${SERVER_URL}${url}`,
      }).then(response => cy.visit(response.body.url))

      // Watch for a request for the account activation
      const { patch } = API['/api/user/auth/account']
      cy.intercept({
         method: patch.request.method,
         url: `**/${patch.request.url}`,
      }).as('activateAccount')

      // Activate account
      cy.origin('https://ethereal.email', () => {
         cy.get('iframe').then($iframe => {
            const $body = $iframe.contents().find('body')

            // Assert that the correct message is displayed
            cy.wrap($body)
               .contains('Account registration in the Online Library')
               .should('be.visible')

            cy.wrap($body).contains('To activate the account click the button').should('be.visible')

            // Click the button with redirection link
            cy.wrap($body).contains('Activate account').should('be.visible').click()
         })
      })

      // Assert that the URL includes the activation token
      cy.url().should('include', '/?activationToken=')

      // Assert that the account activation request is successful
      cy.wait('@activateAccount').its('response.statusCode').should('equal', 200)

      // Assert that the feedback header and message are correct
      cy.getByCy('apiFeedback-header').should('be.visible').should('have.text', patch.header)

      cy.getByCy('apiFeedback-message')
         .should('be.visible')
         .should('have.text', patch.responses[200])

      // TODO: test this behaviour within ApiFeedback.tsx
      cy.getByCy('apiFeedback-button').should('be.visible').click()
      cy.getByCy('apiFeedback').should('not.exist')

      //  // Assert that the location is the login page
      cy.location('pathname').should('eq', '/login')
   })
})

const allow409 = (error: Error & { response: { status: number } }) => {
   const { status } = error.response

   expect(status).to.equal(409)

   return status !== 409
}
