import { API } from '@online-library/config'

describe('Home page', () => {
   it('should allow users to navigate between pages', () => {
      cy.visit('/')

      // Navigate to the login page
      cy.getByCy('button').contains('Login').click()
      cy.location('pathname').should('eq', '/login')

      // Go back to the previous page
      cy.go(-1)

      // Navigate to the registration page
      cy.getByCy('button').contains('Register').click()
      cy.location('pathname').should('eq', '/registration')
   })

   it('should render static stuff', () => {
      cy.visit('/')

      /** ----------------- DESKTOP VIEWPORT ----------------- */

      // Header
      cy.getByCy('header').should('be.visible').should('have.text', 'Online Library')

      // Buttons
      const buttons = ['Login', 'Register']

      cy.getByCy('button')
         .should('have.length', buttons.length)
         .each((button, index) => {
            cy.wrap(button)
               .should('be.visible')
               .should('be.enabled')
               .should('have.text', buttons[index])
         })

      // Image
      cy.checkImage('image')

      // Badges
      const badgeUrls = [
         'https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white',
         'https://img.shields.io/badge/coming%20soon-000000?style=for-the-badge&logo=ios&logoColor=white',
      ]

      cy.getByCy('badge')
         .should('have.length', badgeUrls.length)
         .each((badge, index) => {
            cy.wrap(badge).should('have.css', 'opacity', index === 0 ? '1' : '0.7')
            cy.wrap(badge).should('have.attr', 'src', badgeUrls[index])
         })

      // Advantages
      cy.getByCy('advantage').should('have.length', 4)

      /** ----------------- SMALLER VIEWPORT ----------------- */

      // Check that the image is no longer visible
      cy.viewport(800, 1000)
      cy.getByCy('image').should('not.be.visible')

      // Check that the advantages are no longer visible
      cy.viewport(900, 1000)
      cy.getByCy('advantage').should('not.be.visible')

      /** ----------------- SMALLER VIEWPORT ----------------- */
   })

   it('should download .apk', () => {
      const { url } = API['/api/mobile-app'].get.request

      cy.intercept({
         method: 'GET',
         url: `**/${url}`,
      }).as('getMobileApp')

      cy.visit('/')

      cy.wait('@getMobileApp').its('response.statusCode').should('be.oneOf', [200, 304])

      cy.getByCy('link').first().click()

      cy.readFile('cypress/downloads/app-release.apk', { timeout: 15000 })
   })
})
