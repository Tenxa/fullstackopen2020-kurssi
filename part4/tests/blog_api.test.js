/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const urlBase = '/api/blogs'
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('/api/blogs tests', () => {
  test('notes are returned as json', async () => {
    await api
      .get(urlBase)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get(urlBase)
    expect(response.body).toHaveLength(2)
  })

  test('the first blog is about HTTP methods', async () => {
    const response = await api.get(urlBase)
    expect(response.body[0].title).toBe('HTML is easy')
  })

  test('all notes are returned', async () => {
    const response = await api.get(urlBase)
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get(urlBase)
    const titles = response.body.map(b => b.title)

    expect(titles).toContain('Muay thai')
  })
})


afterAll(() => {
  mongoose.connection.close()
})