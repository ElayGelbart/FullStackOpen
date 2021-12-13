const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0;
  for (const blog of blogs) {
    likes += blog.likes
  }
  return likes
}

const favoriteBlog = (blogs) => {
  let selectedblog = { likes: 0 };
  for (const blog of blogs) {
    if (blog.likes > selectedblog.likes) {
      selectedblog = blog;
    }
  }
  return selectedblog;
}

const mostBlogs = (blogs) => {
  const objectOfAuthor = {}
  for (const blog of blogs) {
    objectOfAuthor[blog.author] = ++objectOfAuthor[blog.author] || 1
  }
  selectedObj = { blogs: 0 }
  for (const likes in objectOfAuthor) {
    if (objectOfAuthor[likes] > selectedObj.blogs) {
      selectedObj.author = likes
      selectedObj.blogs = objectOfAuthor[likes]
    }

  }
  return selectedObj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}