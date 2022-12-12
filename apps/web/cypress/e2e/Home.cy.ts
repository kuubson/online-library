describe('Home page', () => {
   it('Static stuff (header, buttons, image, badges, advantages) on desktop viewport', () => {
      cy.visit('/')

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
   })

   it('Static stuff on smaller viewport', () => {
      cy.visit('/')

      // Set the viewport width to 900 pixels or less.
      cy.viewport(900, 1000)

      // Check that the advantages are no longer visible.
      cy.getByCy('advantage').should('not.be.visible')

      // Set the viewport width to 800 pixels or less.
      cy.viewport(800, 1000)

      // Check that the image is no longer visible.
      cy.getByCy('image').should('not.be.visible')
   })

   it('Navigation', () => {
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

   it('Downloading .apk', () => {
      cy.route({
         method: 'GET',
         url: '**/api/mobile-app',
      }).as('getMobileApp')

      cy.visit('/')

      cy.wait('@getMobileApp').its('response.statusCode').should('be.oneOf', [200, 304])

      cy.getByCy('link').first().click()

      cy.readFile('cypress\\downloads\\app-release.apk', { timeout: 15000 })
   })
})
