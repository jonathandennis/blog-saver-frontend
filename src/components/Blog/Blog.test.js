import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

jest.mock('../services/blogs')

test('renders blog title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luikkannen',
    url: 'http://www.testurl.com',
    likes: 3,
    user: {
      name: 'Jon Dennis',
      username: 'jdfoto'
    }
  }

  const user = {
    name: 'Jon Dennis',
    username: 'jdfoto'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-libraryMatti Luikkannen'
  )
})

test('renders entire blog when click view', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luikkannen',
    url: 'http://www.testurl.com',
    likes: 3,
    user: {
      name: 'Jon Dennis',
      username: 'jdfoto'
    }
  }

  const user = {
    name: 'Jon Dennis',
    username: 'jdfoto'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} toggle={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogView')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-libraryMatti Luikkannenhidehttp://www.testurl.com3likeJon DennisRemove'
  )
})

test('when like button is clicked twice event handler is called twice', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luikkannen',
    url: 'http://www.testurl.com',
    likes: 3,
    id: 'doIreallyNeedAnID',
    user: {
      name: 'Jon Dennis',
      username: 'jdfoto'
    }
  }

  const likedBlog = {
    title: blog.title,
    likes: blog.likes + 1,
    author: blog.author,
    url: blog.url,
    id: blog.id,
    user: blog.user
  }

  const user = {
    name: 'Jon Dennis',
    username: 'jdfoto'
  }

  const mockSetBlogs = jest.fn()
  blogService.update.mockReturnValueOnce('first call')
  blogService.update.mockReturnValueOnce('second call')

  const component = render(
    <Blog blog={blog} user={user} likeblog={mockSetBlogs} />
  )

  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  //component.debug()

  expect(blogService.update).toHaveBeenCalledWith(blog.id, likedBlog)

})

test('BlogForm, form calls proper handler with right details when new blog called', () => {

  const mockCreateBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={mockCreateBlog} />
  )
  const newTitle = component.container.querySelector('#title')
  const newAuthor = component.container.querySelector('#author')
  const newUrl = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(newTitle, {
    target: { value: 'testtitle' }
  })
  fireEvent.change(newAuthor, {
    target: { value: 'testauthor' }
  })
  fireEvent.change(newUrl, {
    target: { value:'www.testurl.com' }
  })

  fireEvent.submit(form)

  //component.debug()
  //console.log('mockCreateBlog.mock.calls[0][0]: ', mockCreateBlog.mock.calls[0][0])

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('testauthor')
})