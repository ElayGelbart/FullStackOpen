const express = require("express")
const Blog = require('../models/blog')
const blogsRouter = express.Router();

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