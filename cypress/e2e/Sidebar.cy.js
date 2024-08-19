describe('Navbar tests', () => {
    beforeEach(()=>{
      cy.visit('/home')
    })
    it('Go To Home Button works correctly',()=>{
        cy.getDataTest('go-to-home-link').click()
        cy.getDataTest('go-to-following-link').click()
        cy.getDataTest('go-to-explore-link').click()
        cy.getDataTest('go-to-live-link').click()

    })
})