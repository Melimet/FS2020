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
describe('when there are initially blogs created', () => {
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
})
describe('when creating a new blog', () => {
  test('new blogs can be created', async () => {
    const newBlog = {
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

  test('likes are set to 0 if amount of likes not defined', async () => {
    const newBlog = {
      "author": "Erkka",
      "title": "Avaimet ilmasiin noppiin",
      "url": "https://weboodi.helsinki.fi/hy/etusivu.html"
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const aftermath = await helper.blogsInDb()

    expect(aftermath.map(i => i.likes)).toContain(0)
  })

  test('400 is returned if new blog is missing title and/or url', async () => {
    const newBlog = {
      "author": "Hessu hopo",
      "likes": 1
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const aftermath = await helper.blogsInDb()
    expect(aftermath.length).toBe(helper.initialBlogs.length)
  })
})
describe('when deleting a blog', () => {
  test('amount of blogs is reduced', async () => {

    const response = await api.get('/api/blogs')
      .expect(200)

    const blogToDelete = response.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  })
  test('correct blog is removed', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)

    const blogToDelete = response.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(i => i.title)

    expect(titles).not.toContain(blogToDelete.title)

  })
})
describe('when updating a blog', () => {
  test('amount of likes is updated correctly', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs[0]

    const updatedBlog = {...blogToUpdate, likes: 10}

    await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog)
      .expect(201)

    const updatedBlogs = await helper.blogsInDb()
    const updatedBlogFromDb = updatedBlogs[0]
    expect(updatedBlogFromDb.likes).toEqual(10)
  })
})
afterAll(() => {
  mongoose.connection.close()
})