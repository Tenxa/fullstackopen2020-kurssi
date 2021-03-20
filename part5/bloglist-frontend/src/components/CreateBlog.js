import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ updateBlogs, createNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      updateBlogs()
      createNotification('green', `A new blog ${title} by ${author}`)
    } catch (e) {
      console.log(e)
      createNotification('red', 'Could not create new blog')
    }
  }


  return (
    <>
      <h3>Create new blog</h3>

      <div className="createBlogContainer">
        <form onSubmit={handleBlogSubmit}>

          <div className='inputTitle'>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div className='inputAuthor'>
            author:
            <input
              type="text"
              value={author}
              name="title"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div className='inputAuthor'>
            url:
            <input
              type="text"
              value={url}
              name="title"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  )
}

export default CreateBlog