import { useState } from 'react'
const Blog = ({ blog }) => {
  const [FullVisibility, setFullVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (FullVisibility) {
    return (
      <div style={blogStyle}>
        <p>title: {blog.title}</p>
        <p>author: {blog.author}</p>
        <p>likes: {blog.likes} <button>Like</button></p>
        <p>URL: {blog.url}</p>
        <button onClick={() => { setFullVisibility(false) }}>Show Less</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => { setFullVisibility(true) }}>Show More</button>
      </div>
    )
  }
}

export default Blog