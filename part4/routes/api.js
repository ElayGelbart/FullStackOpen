const express = require("express")
const Blog = require('../models/blog')
const apiRouter = express.Router();

apiRouter.get('/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

apiRouter.post('/blogs', (request, response) => {
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

module.exports = apiRouter