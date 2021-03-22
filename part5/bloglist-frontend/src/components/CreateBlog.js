import React, { useState } from 'react'

const CreateBlog = ({ updateBlogs, createNotification, handleBlogSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearStates = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <>
      <h3>Create new blog</h3>

      <div className="createBlogContainer">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleBlogSubmit({
            title: title,
            author: author,
            url: url
          })
          clearStates()
        }}>

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