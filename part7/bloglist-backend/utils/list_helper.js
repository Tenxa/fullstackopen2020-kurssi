const _ = require('lodash')
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const getfav = (blogs) => {
  return blogs.reduce((mostLikes, blog) => {
    if (mostLikes.likes <= blog.likes) {
      return blog
    }
    return mostLikes
  }, blogs[0])
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 'Empty list'
    : [getfav(blogs)].map((obj => ({ title: obj.title, author: obj.author, likes: obj.likes })))[0]
}

const mostBlogs = (blogs) => {
  let ss = _.countBy(blogs, 'author')
  let resultObject = {}

  Object.entries(ss).forEach(([key, value]) => {
    resultObject.author = key
    resultObject.blogs = value
  })

  return resultObject
}

const mostLikes = (blogs) => {
  const authors = []
  blogs.forEach((blog => {
    let found = false
    if (authors.length > 0) {
      authors.forEach((auth) => {
        if (auth.author === blog.author) {
          found = true
          auth.likes += blog.likes
        }
      })
      if (found === false) {
        authors.push({ author: blog.author, likes: blog.likes })
      }
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
  }))

  let mostLiked = { author: authors[0].author, likes: authors[0].likes }
  authors.forEach((a => {
    if (a.likes > mostLiked.likes) {
      mostLiked.author = a.author
      mostLiked.likes = a.likes
    }
  }))
  return mostLiked

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}