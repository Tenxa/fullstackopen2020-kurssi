const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Teemu Lindgren',
    url: 'teemu.teemu',
    likes: 432
  },
  {
    title: 'Muay thai',
    author: 'Teemu Lindgren',
    url: 'nakmuay.teemu',
    likes: 500
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'willremovethissoon', ulr: 'url',  likes: 23 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}