import React, { useRef } from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog, initializeBlogs, removeBlog } from '../reducers/blogReducer'
import { setUsers } from '../reducers/usersReducer'
import { Container } from '@material-ui/core'

const Blogs = ({ user, blogs }) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(createNotification(`A new blog ${blogObject.title} by ${blogObject.author}`, 'green', 5))
    } catch (error) {
      console.log(error)
      dispatch(createNotification('Could not create new blog', 'red', 5))
    }
    dispatch(initializeBlogs())
    dispatch(setUsers())
  }

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id))
    dispatch(initializeBlogs())
    dispatch(setUsers())
  }

  return (
    <Container>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <CreateBlog handleBlogSubmit={addBlog} />
      </Togglable>
      <br />
      <div className='blogsListContainer'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} />
        )}
      </div>
    </Container>
  )
}

export default Blogs