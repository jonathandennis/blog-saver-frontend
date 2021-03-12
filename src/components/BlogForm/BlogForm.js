import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import Togglable from '../../components/Togglable/Togglable'

import './styles.scss'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    event.target.title.value = ''

    const author = event.target.author.value
    event.target.author.value = ''

    const url = event.target.url.value
    event.target.url.value = ''

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(title, author, url))
    dispatch(
      setNotification(
        `A new blog:  '${title}' by: ${author} has been added`,
        'ok'
      )
    )
  }

  return (
    <div>
      <Togglable
        buttonLabel='add new content'
        className='btn btn__add'
        ref={blogFormRef}
      >
        <div className='addContent'>
          <div>
            <h2 className='addContent__head heading-2'>Add content:</h2>
          </div>
          <form className='addContent__form' onSubmit={addBlog}>
            <div className='addContent__form--item'>
              Title: <input id='title' name='title' type='text' />
            </div>
            <div className='addContent__form--item'>
              Author: <input id='author' name='author' type='text' />
            </div>
            <div className='addContent__form--item'>
              Url: <input id='url' name='url' type='text' />
            </div>
            <button className='btn btn__create' type='submit'>
              create
            </button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

export default BlogForm
