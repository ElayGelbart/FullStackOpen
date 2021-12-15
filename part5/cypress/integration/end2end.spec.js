// end2end.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get("#userNameInput").type("test")
      cy.get("#passwordInput").type("123456")
      cy.get("#SingInBtn").click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get("#userNameInput").type("Liar")
      cy.get("#passwordInput").type("WrongPass")
      cy.get("#SingInBtn").click()
      cy.contains('blogs').should('not.exist')
    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get("#userNameInput").type("test")
      cy.get("#passwordInput").type("123456")
      cy.get("#SingInBtn").click()
    })

    it('A blog can be created', function () {
      cy.get("#expoandNewForm").click()
      cy.get("#titleInput").type("Test in Cypress")
      cy.get("#authorInput").type("Elay Gelbart")
      cy.get("#urlInput").type("http://test.test")
      cy.get("#CreateNewBlog").click()
      cy.get("#allBlogs").contains("Test in Cypress")
    })
  })
})