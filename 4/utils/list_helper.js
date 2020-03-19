const dummy = (blogs) => {
  return 1
};

const totalLikes = (blogs) => {
  const calculator = (sum, blog) => blog.likes + sum;

  return blogs.reduce(calculator)
};

const favoriteBlog = (blogs) => {
  const favoriteFinder = (prev, curr) => curr.likes > prev.likes ? curr : prev

  return blogs.reduce(favoriteFinder, {likes: 0})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};

