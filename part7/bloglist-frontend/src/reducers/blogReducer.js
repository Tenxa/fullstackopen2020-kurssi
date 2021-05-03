import blogService from '../services/blogs'

const sortByLikes = (arr) => {
  return arr.sort((a, b) => {
    let keyA = a.likes
    let keyB = b.likes
    if (keyA < keyB) return 1
    if (keyA > keyB) return -1
    return 0
  })
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG': {
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  case 'UPDATE_BLOG': {
    const updatedBlog = action.data
    return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
  }
  case 'INIT_BLOGS':
    return sortByLikes(action.data)
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    const blog = await blogService.createComment(id, { comment })
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.deleteById(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id },
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const blog = await blogService.updateLike(id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

export default blogReducer