describe('Home page', () => {
   it('Static stuff (header, buttons, image, badges, advantages)', () => {
      cy.visit('/')

      // Header
      cy.getByCy('header').should('be.visible').should('have.text', 'Online Library')

      // Buttons
      ;['Login', 'Register'].map((text, index) => {
         cy.getByCy('button')
            .eq(index)
            .should('be.visible')
            .should('be.enabled')
            .should('have.text', text)
      })

      // Image
      cy.checkImage('image')

      // Badges
      cy.getByCy('badge').should('have.length', 2)

      cy.getByCy('badge')
         .first()
         .should(
            'have.attr',
            'src',
            'https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white'
         )

      cy.getByCy('badge')
         .last()
         .should(
            'have.attr',
            'src',
            'https://img.shields.io/badge/coming%20soon-000000?style=for-the-badge&logo=ios&logoColor=white'
         )

      // Advantages
      cy.getByCy('advantage').should('have.length', 4)
   })

   it('Downloading .apk', () => {
      cy.intercept({
         method: 'GET',
         url: '**/api/mobile-app',
      }).as('getMobileApp')

      cy.visit('/')

      cy.wait('@getMobileApp').its('response.statusCode').should('be.oneOf', [200, 304])

      cy.window()
         .document()
         .then(document => {
            document.addEventListener('click', () =>
               setTimeout(() => document.location.reload(), 5000)
            )
            cy.getByCy('badge').first().click()
         })

      cy.readFile('cypress\\downloads\\app-release.apk')
   })
})
