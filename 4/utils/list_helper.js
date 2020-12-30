const _ = require('lodash')

const dummy = (blogs) => {
  return 1
};

const totalLikes = (blogs) => {

  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)}

const favoriteBlog = (blogs) => {
  const favoriteFinder = (prev, curr) => curr.likes > prev.likes ? curr : prev

  return blogs.reduce(favoriteFinder, {likes: 0})
}

const mostBlogs = (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((obj, author) => ({author, blogs: obj.length}))
    .maxBy('blogs')
}

const mostLikes= (blogs) => {
  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      const likes = blogs.reduce((sum, blog) => sum+blog.likes, 0)
      return ({author,likes})
    })
    .maxBy('likes')

}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

