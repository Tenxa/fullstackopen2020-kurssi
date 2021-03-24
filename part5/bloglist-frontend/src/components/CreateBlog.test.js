import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

describe('CreateBlog.js tests', () => {
  test('test form callback function', () => {
    const createBlog = jest.fn()

    const component = render(
      <CreateBlog handleBlogSubmit={createBlog} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'testing title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'testing author' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'testing url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing url')
  })
})