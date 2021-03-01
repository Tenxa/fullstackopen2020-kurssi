/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const urlBase = '/api/users'
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

describe('api/users tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  describe('new user validation tests', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post(urlBase)
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username is < 3', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ro',
        name: 'robo',
        password: 'salainen',
      }

      const result = await api
        .post(urlBase)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
      expect(result.error.text).toEqual('{"error":"username and password are required and must be at least 3 characters"}')
    })

    test('creation fails if password is < 3', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'rooo',
        name: 'robo',
        password: 'sa',
      }

      const result = await api
        .post(urlBase)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
      expect(result.error.text).toEqual('{"error":"username and password are required and must be at least 3 characters"}')
    })

    test('creation fails if username is undefined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: '',
        name: 'robo',
        password: 'saae',
      }

      const result = await api
        .post(urlBase)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
      expect(result.error.text).toEqual('{"error":"username and password are required and must be at least 3 characters"}')
    })

    test('creation fails if password is undefined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'wadaa',
        name: 'robo',
        password: '',
      }

      const result = await api
        .post(urlBase)
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toEqual(usersAtStart)
      expect(result.error.text).toEqual('{"error":"username and password are required and must be at least 3 characters"}')
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
