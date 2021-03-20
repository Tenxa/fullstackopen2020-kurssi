import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notiMessage, setNotiMessage] = useState(null)
  const [notiColor, setNotiColor] = useState(null)

  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  return (
    <div>
      {user === null ?
        <div className='loginViewContainer'>
          <h1>Log in to application</h1>
          <Notification message={notiMessage} color={notiColor} />
          <Login username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            user={user} setUser={setUser} createNotification={createNotification}/>
        </div>
        :

        <div>
          <h2>blogs</h2>
          <Notification message={notiMessage} color={notiColor} />
          <div>{user.name} is logged in <button onClick={handleLogout}>logout</button></div>
          <br />

          <CreateBlog updateBlogs={getBlogs} setNotiMessage={setNotiMessage} setNotiColor={setNotiColor} createNotification={createNotification} />

          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App