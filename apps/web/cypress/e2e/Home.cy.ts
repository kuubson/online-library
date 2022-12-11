describe('Home page', () => {
   it('passes', () => {
      cy.getByCy('button').should('be.visible').should('have.length', 2)
   })
})
