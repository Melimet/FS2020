const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are identified by id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('new blogs can be created', async () => {
  const newBlog =  {
    "author": "Erkka",
    "likes": 123234,
    "title": "Avaimet ilmasiin noppiin",
    "url": "https://weboodi.helsinki.fi/hy/etusivu.html"
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const aftermath = await helper.blogsInDb()
  expect(aftermath.length).toBe(helper.initialBlogs.length + 1)

  expect(aftermath.map(i => i.author)).toContain('Erkka')
})

test('likes are set to 0 if amount of likes not defined', async () =>{
  const newBlog =  {
    "author": "Erkka",
    "title": "Avaimet ilmasiin noppiin",
    "url": "https://weboodi.helsinki.fi/hy/etusivu.html"
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const aftermath = await helper.blogsInDb()

  expect(aftermath.map(i => i.likes)).toContain('0')
})

test('400 is returned if new blog is missing title and url', async () => {
  const newBlog = {
    "author": "Hessu hopo",
    "likes": "1"
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const aftermath = await helper.blogsInDb()
  expect(aftermath.length).toBe(helper.initialBlogs.length)

})
afterAll(() => {
  mongoose.connection.close()
})