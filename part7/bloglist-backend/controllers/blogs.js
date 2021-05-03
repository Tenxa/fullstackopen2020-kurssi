const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  console.log('blogit', blogs)
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (body.title === undefined || body.url === undefined || body.title === '' || body.url === '') {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    }).save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.json(blog)
  }
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const { comment } = request.body
  if (!comment || comment === ''){
    return response.status(400).json({ error: 'empty comment' }).end()
  }

  const blog = await Blog.findById(request.params.id)
  blog.comments.push(comment)
  await blog.save()
  response.json(blog)
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Unauthorized to delete this blog' })
  }
})


blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const blog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blog)
})


module.exports = blogsRouter