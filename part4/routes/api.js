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
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = apiRouter