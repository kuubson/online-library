import { API, CLIENT_URL } from '@online-library/config'

/// <reference types="cypress" />

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Cypress {
      interface Chainable {
         getByCy(dataCy: string): Chainable<JQuery<HTMLElement>>
         checkImage(dataCy: string): Chainable<JQuery<HTMLElement>>
         seedUser(): Chainable
         deleteTestUser(): Chainable
      }
   }
}

Cypress.Commands.add('getByCy', (selector, ...args) => cy.get(`[data-cy=${selector}]`, ...args))

Cypress.Commands.add('checkImage', (selector, ...args) =>
   cy.get(`[data-cy=${selector}]`, ...args).should(image => {
      expect((image[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
      expect((image[0] as HTMLImageElement).naturalHeight).to.be.greaterThan(0)
   })
)

Cypress.Commands.add('seedUser', () => {
   const { method, url } = API['/api/testing/seed-user'].get.request
   cy.request({
      method,
      url: `${CLIENT_URL}${url}`,
   })
      .its('status')
      .should('equal', 200)
})

Cypress.Commands.add('deleteTestUser', () => {
   const { method, url } = API['/api/testing/test-user'].delete.request
   cy.request({
      method,
      url: `${CLIENT_URL}${url}`,
   })
      .its('status')
      .should('equal', 200)
})
