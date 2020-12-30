const Blog = require('../models/blog')

const initialBlogs = [
  {
    "author": "Edsger W. Dijkstra",
    "likes": 5,
    "title": "Go To Statement Considered Harmful",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html%22%7D"
  },
  {
    "author": "Diippi Filosofi",
    "likes": 9001,
    "title": "Javascript man good",
    "url": "https://fullstackopen.com/osa4/backendin_testaaminen"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogsInDb, initialBlogs
}