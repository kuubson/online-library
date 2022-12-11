describe('Home page', () => {
   it('Header', () => {
      cy.getByCy('header').should('be.visible').should('have.text', 'Online Library')
   })

   it('Buttons', () => {
      ;['Login', 'Register'].map((text, index) => {
         cy.getByCy('button')
            .eq(index)
            .should('be.visible')
            .should('be.enabled')
            .should('have.text', text)
      })
   })

   it('Image', () => {
      cy.intercept({
         method: 'GET',
         url: '/api/mobile-app',
      }).as('getMobileApp')

      cy.wait('@getMobileApp').its('response.statusCode').should('be.oneOf', [200, 304])

      cy.getByCy('image').should(image => {
         expect((image[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
      })

      cy.getByCy('badge').eq(2).click()

      cy.readFile('cypress\\downloads\\app-release.apk', { timeout: 15000 }).should('exist')
   })
})
