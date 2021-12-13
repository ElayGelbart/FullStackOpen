const app = require("../index")
const request = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
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
  author: "String",
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
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

afterAll(async () => {
  await mongoose.connection.close()
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
});