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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Tenxa')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('Teemu Lindgren is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('afafs')
      cy.get('#password').type('dapdapa')
      cy.get('#loginButton').click()
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Tenxa', password: 'salainen' })

      cy.createBlog({
        title: 'FirstCypress',
        author: 'FirstCypress',
        url: 'FirstCypress',
        likes: 3
      })
      cy.createBlog({
        title: 'SecondCypress',
        author: 'SecondCypress',
        url: 'SecondCypress',
        likes: 2
      })
      cy.createBlog({
        title: 'ThirdCypress',
        author: 'ThirdCypress',
        url: 'ThirdCypress',
        likes: 1
      })
    })

    it('A blog can be created', function () {
      cy.get('.togglableButton').click()
      cy.get('#title').type('cypress Title1')
      cy.get('#author').type('cypress Author1')
      cy.get('#url').type('cypress url1')
      cy.get('#submitBlogButton').click()
      cy.get('.notification')
        .should('contain', 'A new blog cypress Title1 by cypress Author1')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blogsListContainer').within(() => {
        cy.get('.singleBlogContainer:last')
          .should('contain', 'cypress Title1')
          .and('contain', 'cypress Author1')
          .and('contain', 'View')
      })

    })

    it('A blog can be liked', function () {
      cy.get('#viewBlogButton:first').click()
      cy.get('#likeBlogButton').click()
      cy.get('.showWhenVisible', { timeout: 15000 })
        .should('contain', 'likes 4')
    })

    it('A blog can be removed by the user that created it', function () {
      cy.get('.togglableButton').click()
      cy.get('#title').type('cypress Title')
      cy.get('#author').type('cypress Author')
      cy.get('#url').type('cypress url')
      cy.get('#submitBlogButton').click()

      cy.get('#viewBlogButton').click()
      cy.get('#removeButton')
    })

    it('Unauthorized user cannot delete a blog', function () {
      cy.request('POST', 'http://localhost:3003/api/users', { name: 'Namn', username: 'newUser', password: '1234' })
      cy.get('#logOut').click()
      cy.get('#username').type('newUser')
      cy.get('#password').type('1234')
      cy.get('#loginButton').click()

      cy.get('#viewBlogButton:last').click()
      cy.get('.singleBlogContainer:last').within(() => {
        cy.get('#removeButton')
          .should('not.exist')
      })
    })

    it('The blogs order changes if it gets more likes than the blog above', function () {
      // order in beginning
      cy.get('.singleBlogContainer').should('have.length', 3)
        .then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'FirstCypress')
          cy.wrap(blogs[1]).should('contain', 'SecondCypress')
          cy.wrap(blogs[2]).should('contain', 'ThirdCypress')
        })

      cy.get('.singleBlogContainer').last().within(() => {
        cy.get('#viewBlogButton').click()
        cy.get('#likeBlogButton').click()
        cy.wait(1500)
        cy.get('#likeBlogButton').click()
      })
    })
  })
})