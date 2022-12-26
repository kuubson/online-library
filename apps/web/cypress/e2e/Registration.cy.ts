import { API, TEST_USER } from '@online-library/config'

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

   it('should not allow registrating due to already taken account', () => {
      cy.seedUser()

      cy.getByCy('input').eq(0).type(TEST_USER.name)
      cy.getByCy('input').eq(1).type(TEST_USER.email)
      cy.getByCy('input').eq(2).type(TEST_USER.password)
      cy.getByCy('input').eq(3).type(TEST_USER.password)

      cy.getByCy('submit').click()

      const {
         request: { url },
         header,
         responses,
      } = API['/api/user/auth/register'].post

      cy.intercept({
         method: 'POST',
         url: `**/${url}`,
      }).as('register')

      cy.on('uncaught:exception', allow409)

      cy.getByCy('header').should('be.visible').should('have.text', header)

      cy.getByCy('message').should('be.visible').should('have.text', responses[409])
   })
})

const allow409 = (error: Error & { response: { status: number } }) => {
   const { status } = error.response

   expect(status).to.equal(409)

   return status !== 409
}
