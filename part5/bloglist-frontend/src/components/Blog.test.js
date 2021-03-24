import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog.js tests', () => {
  const blog = {
    title: 'titteli',
    author: 'kirjoittaja',
    url: 'www.olensokea.fi',
    likes: 555,
    user: {
      id: 75464,
    }
  }

  test('Renders title and author', () => {
    const component = render(
      <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(
      blog.title, blog.author
    )
  })

  test('Renders url and likes after view button has been clicked', () => {
    const component = render(
      <Blog blog={blog}/>
    )
    const viewButton = component.getByText('View')

    fireEvent.click(viewButton)
    expect(component.container).toHaveTextContent(
      blog.url, blog.likes.toString()
    )
  })

  test('Like button pressed twice', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} updateBlog={mockHandler}/>
    )
    const viewButton = component.getByText('View')
    const likeButton = component.getByText('like')

    fireEvent.click(viewButton)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
