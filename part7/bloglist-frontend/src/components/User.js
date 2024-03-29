import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  if (user === null) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li key={blog.id}>{blog.title}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default User