const app = require("../index")
const request = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const User = require("../models/user")
let ServerSentJWT;
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }, {
    _id: "5a422a851b54a676234d18f7",
    title: "just the test check",
    author: "test",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]
const mockNewBlog = {
  title: "String",
  author: "test",
  url: "String",
  likes: 5
}
const mockNewBlogNoLike = {
  title: "String",
  author: "String",
  url: "String",
}

const mockDataUpdate = {
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 10,
}

const mockUser = {
  username: "test",
  name: "test test",
  password: "123456"
}
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  mongoose.connection.close();
  app.killServer();

})

describe('API TEST', () => {
  test('should get all blogs', async () => {
    const response = await request(app).get("/api/blogs")
    expect(response.body).toHaveLength(blogs.length)
  });
  test('should verify blog id', async () => {
    const response = await request(app).get("/api/blogs")
    expect(response.body[1]._id).toBeDefined()
  });
  test('should post new blog', async () => {
    const response = await request(app).post("/api/blogs").send(mockNewBlog)
    expect(response.statusCode).toBe(201)
    const getResponse = await request(app).get("/api/blogs");
    expect(getResponse.body.length).toBe(blogs.length + 1)
  });

  test('should post new blog without like 0', async () => {
    const response = await request(app).post("/api/blogs").send(mockNewBlogNoLike)
    expect(response.statusCode).toBe(201)
    const getResponse = await request(app).get("/api/blogs");
    expect(getResponse.body[getResponse.body.length - 1].likes).toBe(0)
  });
  test('should post new blog without title 400', async () => {
    const response = await request(app).post("/api/blogs").send({})
    expect(response.statusCode).toBe(400)
  });
  test('should delete one blog with title', async () => {
    await request(app).delete("/api/blogs").send({ title: "React patterns" })
    const getResponse = await request(app).get("/api/blogs");
    expect(getResponse.body.length).toBe(blogs.length - 1)
  });
  test('should update one blog with title', async () => {
    await request(app).put("/api/blogs").send(mockDataUpdate)
    const getResponse = await request(app).get("/api/blogs");
    const indexOfMock = getResponse.body.find((obj) => obj.title === mockDataUpdate.title)
    expect(indexOfMock.likes).toBe(10)
  });

  describe('Mission D', () => {
    test('should not create user with invalid', async () => {
      const response = await request(app).post("/api/users/signup")
      expect(response.statusCode).toBe(400)
    });
    test('should not create user with invalid', async () => {
      await request(app).post("/api/users/signup").send(mockUser)
      const userArray = await User.find({})
      expect(userArray[0]["username"]).toBe("test")

    });
    test('should get cookie after login', async () => {
      const response = await request(app).post("/api/users/login").send(mockUser)
      expect(response.headers["set-cookie"][0]).toBeDefined()
      ServerSentJWT = response.headers["set-cookie"][0].match(/\w+\.\w+\..+?(?=;)/)[0];
    });
    test('should not can post blog without auth', async () => {
      const response = await request(app).post("/api/blogs/auth").send(mockNewBlog)
      expect(response.statusCode).toBe(400)
    });
    test('should can post blog with auth', async () => {
      const response = await request(app).post("/api/blogs/auth")
        .set("Authorization", `Bearer ${ServerSentJWT}`).send(mockNewBlog)
      expect(response.statusCode).toBe(201)
    });
    test('should not can delete blog without auth', async () => {
      const response = await request(app).delete("/api/blogs/auth").send(mockNewBlog)
      expect(response.statusCode).toBe(400)
    });
    test('should delete blog with right username', async () => {
      await request(app).delete("/api/blogs/auth")
        .set("Authorization", `Bearer ${ServerSentJWT}`).send({
          title: "just the test check",
          author: "test",
        })
      const getResponse = await request(app).get("/api/blogs");
      expect(getResponse.body.length).toBe(blogs.length - 1)
    });
  });
});