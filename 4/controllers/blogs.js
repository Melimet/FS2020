const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {

  const blog = new Blog(request.body)
  try {
    const readyBlog = await blog.save()
    response.status(201).json(readyBlog)
  } catch (error) {
    next(error)
  }
})
blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try{
    const blogToDelete = await Blog.findById(id)
    await Blog.findByIdAndRemove(blogToDelete.id)
    response.status(200).end()

  }catch (error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {

    await Blog.findByIdAndUpdate(id, blog, {new: true})
    response.status(201).end()

  }catch(error){
    next(error)
  }
})

module.exports = blogsRouter
