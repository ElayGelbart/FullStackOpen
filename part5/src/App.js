import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginPage from './components/LoginPage'
import NewBlogForm from './components/NewBlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [Username, setUsername] = useState(localStorage.getItem("Username") || "")
  const [Nofication, setNofication] = useState({ text: "", color: "white" })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  function logoutUser() {
    localStorage.setItem("Username", "")
    setUsername("")
  }


  if (Username) {
    return (
      <div>
        <p style={{ color: Nofication.color }}>{Nofication.text}</p>
        <h2>blogs</h2>
        <p>{Username} Logged In <button onClick={() => { logoutUser() }}>LogOut</button></p>
        <NewBlogForm setBlogs={setBlogs} setNofication={setNofication} />
        <div id="allBlogs">
          {blogs.sort((a, b) => {
            if (a.likes > b.likes) { return -1 }
            else if (a.likes < b.likes) { return 1 }
            else { return 0 }
          }).map(blog =>
            <Blog setBlogs={setBlogs} setNofication={setNofication} key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  } else {
    return <LoginPage setUsername={setUsername} Nofication={Nofication} setNofication={setNofication} />
  }
}

export default App