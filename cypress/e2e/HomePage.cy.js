describe('Home Page tests', () => {
    beforeEach(()=>{
      cy.visit('/home')
    })
    it('Home Page works correctly', () => {
        cy.getDataTest('tiktok-0').should('be.visible')
        cy.getDataTest('tiktok-1').should('not.be.visible')
        cy.getDataTest('for-you-container').scrollTo(0, 500)
        cy.getDataTest('tiktok-0').should('not.be.visible')
        cy.getDataTest('tiktok-1').should('be.visible')
    })
  })