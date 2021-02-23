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


/*const listWithMultipleBlogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]*/


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}