/// <reference types="cypress" />

export {}

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Cypress {
      interface Chainable {
         getByCy(dataCy: string): Chainable<JQuery<HTMLElement>>
      }
   }
}

Cypress.Commands.add('getByCy', (selector, ...args) => cy.get(`[data-cy=${selector}]`, ...args))
