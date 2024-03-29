import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return response.data
}

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

const updateComment = async (id, comment) => {
  const oldBlog = await axios.get(`${baseUrl}/${id}`)
  const newBlog = {
    ...oldBlog.data,
    comments: oldBlog.data.comments.concat(comment)
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const updateLike = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const oldBlog = await axios.get(`${baseUrl}/${id}`)
  const newBlog = {
    ...oldBlog.data,
    likes: oldBlog.data.likes +1
  }
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

const deleteById = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll, setToken,
  create, update,
  updateLike, deleteById,
  updateComment, createComment }