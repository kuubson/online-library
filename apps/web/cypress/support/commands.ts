/// <reference types="cypress" />

export {}

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Cypress {
      interface Chainable {
         getByCy(dataCy: string): Chainable<JQuery<HTMLElement>>
         checkImage(dataCy: string): Chainable<JQuery<HTMLElement>>
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
