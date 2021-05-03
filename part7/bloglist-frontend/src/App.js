import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, } from './reducers/blogReducer'
import { removeUser, setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import User from './components/User'
import BlogView from './components/BlogView'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Users from './components/Users'
import Notification from './components/Notification'
import NavMenu from './components/NavMenu'
import { Container } from '@material-ui/core'


const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    } else {
      dispatch(removeUser())
    }
  }, [])


  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <div>
      {currentUser === null ? null : <NavMenu user={currentUser} />}
      <Container component="main" maxWidth="lg" >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Notification />
          <h2>Blog app</h2>
        </div>

        <Switch>
          <Route path="/login">
            {currentUser === null || undefined ?
              <Login /> : <Redirect to="/blogs" />}
          </Route>

          <Route path="/users/:id">
            <User user={user} />
            <button onClick={() => history.push('/users')}>Go back</button>
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/blogs/:id">
            <BlogView blog={blog} />
          </Route>

          <Route path="/blogs">
            {currentUser ?
              <div>
                <Blogs user={currentUser} blogs={blogs} />
              </div> : null}
          </Route>

          <Route path="/">
            {currentUser === null || undefined ?
              <Redirect to="/login" /> : <Redirect to="/blogs" />}
          </Route>
        </Switch>
      </Container>

    </div>
  )
}

export default App