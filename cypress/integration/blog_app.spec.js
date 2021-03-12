describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jon Dennis',
      username: 'jdfoto',
      password: 'jdfoto'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('jdfoto')
      cy.get('#password')
        .type('jdfoto')
      cy.get('#login-button')
        .click()

      cy.contains('Jon Dennis logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('jdfoto')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Jon Dennis logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jdfoto', password: 'jdfoto' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('James Joyce')
      cy.get('#url')
        .type('http://www.website.com')

      cy.contains('create')
        .click()

      cy.get('.notification')
        .should('contain', 'a new blog a blog created by cypress by James Joyce added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('a blog created by cypress')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'initial cypress beforeEach blog',
          author: 'Joe Blow',
          likes: 0,
          url: 'http://www.initialurl.com'
        })
      })

      it('User can like a blog', function() {
        cy.contains('view')
          .click()
        cy.contains('like')
          .click()

        cy.get('.notification')
          .should('contain', 'Like added to: initial cypress beforeEach blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('User can delete a blog', function() {
        cy.contains('view')
          .click()
        cy.contains('Remove')
          .click()

        cy.get('.notification')
          .should('contain', 'initial cypress beforeEach blog by Joe Blow was successfully deleted!')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })
      describe.only('multiple blogs and another user exists', function () {
        beforeEach(function () {
          const anotherUser = {
            name: 'Lara Junod',
            username: 'lmjunod',
            password: 'lmjunod'
          }
          cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)

          cy.createBlog({
            title: 'Another blog',
            author: 'Mick Jagger',
            likes: 3,
            url: 'http://www.anotherurl.com'
          })
          cy.createBlog({
            title: 'And another blog',
            author: 'Frank Zappa',
            likes: 1,
            url: 'http://www.andanotherurl.com'
          })
        })

        it('another user cannot delete blogs', function () {
          cy.contains('logout')
            .click()
          cy.contains('login')
            .click()
          cy.get('#username')
            .type('lmjunod')
          cy.get('#password')
            .type('lmjunod')
          cy.get('#login-button')
            .click()
          cy.contains('view')
            .click()
            .get('html').should('not.contain', 'Remove')
        })

        it('blogs are ordered according to likes', function () {
          cy.get('li').eq(0).should('contain', 'Mick Jagger')
          cy.get('li').eq(1).should('contain', 'Frank Zappa')
          cy.get('li').eq(2).should('contain', 'Joe Blow')
        })
      })
    })
  })
})