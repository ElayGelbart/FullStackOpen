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

    it('should let user like a blog', () => {
      cy.get(".showMoreBtn:first").click()
      cy.get(".likeCount:first").invoke('text').then(parseFloat).then((like1value) => {
        cy.get(".likeBtn").click()
        cy.wait(1000)
        cy.get(".likeCount:first").invoke('text').then(parseFloat).should((like2value) => {
          expect(like1value + 1).to.eq(like2value)
        })
      })
    });

    it('should let user delete a blog', () => {
      cy.get(".Blogs").its("length").then((length1) => {
        console.log(length1, "length1")
        cy.get("#allBlogs").contains("Test in Cypress").parent().within((wow) => {
          console.log(wow)
          cy.get(".showMoreBtn").click()
          cy.wait(1000)
          cy.get(".deleteBtn").click()
        })
        cy.wait(2000)
        cy.get(".Blogs .").its("length").should("eq", length1 - 1)
      })
    });

    it.only('should be sorted', () => {
      cy.get(".showMoreBtn").each((elem) => {
        elem.click()
      })
      const likedArray = []
      cy.get(".likeCount").each((elem) => {
        console.log(elem);
        likedArray.push(Number(elem.text()))

      }).then(() => {
        expect(likedArray).to.eq(likedArray.sort().reverse())
      })
    });

  })
})