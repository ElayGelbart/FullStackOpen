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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}