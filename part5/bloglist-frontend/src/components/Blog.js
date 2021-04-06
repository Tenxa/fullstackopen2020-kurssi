import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const newBlog = { ...blog }
    newBlog.likes += 1
    delete newBlog['id']
    updateBlog(blog.id, newBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='singleBlogContainer' style={blogStyle}>
      <div className='hideWhenVisible' style={hideWhenVisible}>
        {blog.title} {blog.author} <button id='viewBlogButton' onClick={toggleVisibility}>View</button>
      </div>

      <div className='showWhenVisible' style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button> <br />
        {blog.url} <br />
        likes {blog.likes} <button id='likeBlogButton' onClick={handleLike}>like</button> <br />
        {blog.author}
        <div>
          {user.username !== blog.user.username ? null : <button id='removeButton' onClick={handleDelete}>Remove</button>}
        </div>
      </div>
    </div >
  )
}


export default Blog