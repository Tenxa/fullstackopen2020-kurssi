import React, { useState } from 'react'

const CreateBlog = ({ handleBlogSubmit }) => {
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

          <div className='inputTitleDiv'>
            <label htmlFor='title'>title:</label>
            <input
              type="text"
              value={title}
              id="title"
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div className='inputAuthorDiv'>
            <label htmlFor='author'>author:</label>
            <input
              type="text"
              value={author}
              id="author"
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>

          <div className='inputAuthorDiv'>
            <label htmlFor='url'>url:</label>
            <input
              type="text"
              value={url}
              id="url"
              name="url"
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