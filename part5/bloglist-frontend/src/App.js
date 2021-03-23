import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notiMessage, setNotiMessage] = useState(null)
  const [notiColor, setNotiColor] = useState(null)
  const blogFormRef = useRef()

  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => {
        let keyA = a.likes
        let keyB = b.likes
        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
      }))
    )
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNotification = (color, message) => {
    setNotiColor(color)
    setNotiMessage(message)
    setTimeout(() => {
      setNotiMessage(null)
      setNotiColor(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        createNotification('green', `A new blog ${returnedObject.title} by ${returnedObject.author}`)
      }).catch(e => {
        console.log(e)
        createNotification('red', 'Could not create new blog')
      })
  }

  // refaktorointi: korvaa clientissä blogi päivityksen palauttamalla blogilla.
  // Nyt haetaan kaikki blogit uudestaan.
  const updateBlog = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    getBlogs()
  }

  const deleteBlog = async (id) => {
    await blogService.deleteById(id)
    getBlogs()
  }

  return (
    <div>
      {user === null ?
        <div className='loginViewContainer'>
          <h1>Log in to application</h1>
          <Notification message={notiMessage} color={notiColor} />
          <Login
            user={user}
            setUser={setUser}
            createNotification={createNotification} />
        </div>
        :

        <div>
          <h2>blogs</h2>
          <Notification message={notiMessage} color={notiColor} />
          <div>{user.name} is logged in <button onClick={handleLogout}>logout</button></div>
          <br />

          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <CreateBlog handleBlogSubmit={addBlog} setNotiMessage={setNotiMessage}
              setNotiColor={setNotiColor} createNotification={createNotification}
            />
          </Togglable>

          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
          )}
        </div>
      }

    </div>
  )
}

export default App