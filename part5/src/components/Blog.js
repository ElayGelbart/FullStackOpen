import { useState } from 'react'
const Blog = ({ blog, setNofication, setBlogs }) => {
  const [FullVisibility, setFullVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  async function addLike() {
    try {
      const response = await fetch("/api/blogs/like", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: blog._id,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      blog.likes = ++blog.likes
      setNofication({ text: "like Added", color: "green" });
    } catch (err) {
      setNofication({ text: "cant like", color: "red" });
    }
  }
  async function deleteBlog() {
    try {
      const response = await fetch("/api/blogs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: blog.title,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      const getresponse = await fetch("/api/blogs");
      if (getresponse.ok) {
        const blogs = await getresponse.json();
        console.log(blogs);
        setBlogs(blogs);
        setNofication({ text: "blog deleted", color: "green" });
        return;
      }
      throw response;
    } catch (err) {
      setNofication({ text: "cant delete", color: "red" });
    }
  }

  if (FullVisibility) {
    return (
      <div style={blogStyle}>
        <p>title: {blog.title}</p>
        <p>author: {blog.author}</p>
        <p className='likeCount'>likes: {blog.likes} <button onClick={() => { addLike() }}>Like</button></p>
        <p>URL: {blog.url}</p>
        <button onClick={() => { setFullVisibility(false) }}>Show Less</button>
        <button onClick={() => { deleteBlog() }}>Delete Blog</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <span>{blog.title}</span> <span>{blog.author} </span><button className='showMoreBtn' onClick={() => { setFullVisibility(true) }}>Show More</button>
      </div>
    )
  }
}

export default Blog