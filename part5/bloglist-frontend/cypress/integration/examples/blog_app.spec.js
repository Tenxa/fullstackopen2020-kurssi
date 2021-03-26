describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teemu Lindgren',
      username: 'Tenxa',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('form').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Tenxa')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('Teemu Lindgren is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('afafs')
      cy.get('#password').type('dapdapa')
      cy.get('#loginButton').click()
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Tenxa')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function() {
      cy.get('.togglableButton').click()
      cy.get('#title').type('cypress Title')
      cy.get('#author').type('cypress Author')
      cy.get('#url').type('cypress url')
      cy.get('#submitBlogButton').click()
      cy.get('.notification')
        .should('contain', 'A new blog cypress Title by cypress Author')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blogsListContainer')
        .should('contain', 'cypress Title')
        .and('contain', 'cypress Author')
        .and('contain', 'View')
    })
  })
})