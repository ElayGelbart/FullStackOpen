const express = require("express")
const Blog = require('../models/blog')
const jwt = require("jsonwebtoken")
const tokenExtractor = require("../middleware/tokenExtractor")
const blogsRouter = express.Router();
const JWTSECRET = "shhhhh"
blogsRouter.use(tokenExtractor)
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).send()
    return;
  }
  if (!request.body.likes) {
    request.body.likes = 0
  }
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.post('/auth', (request, response) => {
  try {
    const cookieUserObj = jwt.verify(request.token, JWTSECRET);
    if (typeof cookieUserObj === "string") {
      throw cookieUserObj;
    }
    if (!request.body.title || !request.body.url) {
      response.status(400).send()
      return;
    }
    if (!request.body.likes) {
      request.body.likes = 0
    }
    const blog = new Blog(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  } catch (err) {
    response.status(400).send("inValid")
    return;
  }
})

blogsRouter.delete("/", async (request, response) => {
  try {
    const { title } = request.body
    await Blog.deleteOne({ title: title })
    response.send()
  } catch (err) {
    response.status(300).send()
  }
})

blogsRouter.put("/", async (request, response) => {
  try {
    const { title } = request.body
    await Blog.updateOne({ title: title }, request.body)
    response.send()
  } catch (err) {
    response.status(300).send()
  }
})

module.exports = blogsRouter