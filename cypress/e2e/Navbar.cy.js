describe('Navbar tests', () => {
    beforeEach(()=>{
      cy.visit('/home')
    })
    it('Navbar in not scrollable', () => {
        cy.getDataTest('navbar').should('be.visible')
        cy.getDataTest('for-you-container').scrollTo(0, 500)
        cy.getDataTest('navbar').should('be.visible')
    })
    it('Navbar has all elements', () => {
        cy.getDataTest('navbar').find('[data-test="search-input"]').should('exist')
        cy.getDataTest('navbar').find('[data-test="search-button"]').should('exist')
        cy.getDataTest('navbar').find('[data-test="upload-link"]').should('exist')
        cy.getDataTest('navbar').find('[data-test="profile-thumbnail"]').should('exist')
        cy.getDataTest('navbar').find('[data-test="log-out-button"]').should('exist')
        cy.getDataTest('navbar').find('[data-test="TikTok-icon"]').should('exist')
        cy.getDataTest('navbar').find('[data-test="go-to-profile-button"]').should('exist')
        cy.getDataTest('navbar').contains(/TikTok/i)
    })
    it('Search in navbar works correctly', () => {
        cy.getDataTest("search-input").type("kind")
        cy.getDataTest("search-button").click();
    })
    it('Upload link works correctly', () =>{
        cy.getDataTest("upload-link").click()
    })
    
    /* 
    it('Go to profile works correctly', ()=>{
        cy.getDataTest("go-to-profile-button").click()
    })
    */
  })