describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
  it('passes', () => {
    cy.getDataTest('sign-in-button').contains(/Zaloguj się/i)
    cy.getDataTest('sign-up-button').contains(/Zarejestruj się/i)
  })
  it('Sign In window works correctly', () => {
    cy.getDataTest('sign-in-button').click()
    cy.getDataTest('sign-in-window').should('be.visible')
    cy.getDataTest('sign-in-email-input').type('themotivationmentor777@gmail.com')
    cy.getDataTest('sign-in-password-input').type('theMtiMENt13145')
    cy.getDataTest('handle-sign-in-button').click()

    cy.visit('/home')
  })
})