/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const urlBase = '/api/blogs'
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
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
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get(urlBase)
    const titles = response.body.map(b => b.title)

    expect(titles).toContain('Muay thai')
  })

  //4.10: blogilistan testit, step3
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'newBlog',
      author: 'Teeme',
      url: 'tram.afe',
      likes: 321
    }

    await api
      .post(urlBase)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('newBlog')
  })

  //4.12*: blogilistan testit, step5
  test('blog without title and url is not added', async () => {
    const newBlog = { author: 'noTitle' }

    await api
      .post(urlBase)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`${urlBase}/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  //4.9*: blogilistan testit, step2
  test('blog identifier is "id" not "_id" for all', async () => {
    const response = await api.get(urlBase)
    response.body.forEach(e => {
      expect(e.id).toBeDefined()
    })
  })

  //4.11*: blogilistan testit, step4
  test('if likes are undefined initialize it to 0', async () => {
    const newBlog = {
      title: 'newBlog',
      author: 'Teeme',
      url: 'tram.afe',
    }

    await api
      .post(urlBase)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('VIKA BLOGI BOE', blogsAtEnd[2])
    expect(blogsAtEnd[2].likes).toBe(0)
  })
})


afterAll(() => {
  mongoose.connection.close()
})