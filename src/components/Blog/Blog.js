import React from 'react'
import { useDispatch } from 'react-redux'

import { likeBlog, deleteBlog, addComment } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

import { useHistory } from 'react-router-dom'

import './styles.scss'

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  // Allow blogs to be deleted only if blog post created by user
  const showDeleteButton = () => {
    if (loggedUser.username === blog.user['username']) {
      return (
        <button
          className='btn btn__delete'
          onClick={() => handleDeleteBlog(blog.id)}
        >
          Delete: {blog.title}
        </button>
      )
    }
  }

  const handleDeleteBlog = (id) => {
    if (window.confirm(`Remove: ${blog.title} By: ${blog.author}?`))
      try {
        dispatch(deleteBlog(id))
        history.push('/')
        dispatch(
          setNotification(
            `${blog.title} by ${blog.author} was successfully deleted!`,
            'ok'
          )
        )
      } catch (exception) {
        dispatch(setNotification('Error!'))
      }
  }

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Like added to: ${blog.title}`, 'ok'))
    } catch (exception) {
      dispatch(setNotification('Error!'))
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const comment = event.target.comment.value
      event.target.comment.value = ''
      dispatch(addComment(blog.id, comment))
      dispatch(setNotification('Your comment was added successfully!', 'ok'))
    } catch (exception) {
      dispatch(setNotification('Error!'))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className='blog-container'>
      <div className='blogview'>
        <div>
          <h2 className='blogview__title heading-2'>
            {blog.title},&nbsp;&nbsp;{blog.author}
          </h2>
        </div>
        <div className='blogview__info'>
          <div className='blogview__info--item'>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div className='blogview__info--item'>
            {blog.likes}&nbsp;Likes&nbsp;&nbsp;&nbsp;
            <button onClick={handleLike} className='btn btn__like'>
              like
            </button>
          </div>
          <div className='blogview__info--item'>
            added by:&nbsp;{blog.user.name}
          </div>
        </div>
      </div>
      <div className='comments'>
        <div className='comments__form'>
          <form onSubmit={handleComment}>
            <input name='comment' id='comment-input' />
            <button type='submit' className='btn__comment'>
              add comment
            </button>
          </form>
        </div>
        <h5 className='comments__head heading-3'>comments:</h5>
        <ul className='comments__list'>
          {blog.comments.map((comment) => (
            <li
              key={comment.id}
              className='comments__list--item comment_stripe-li'
            >
              {comment.comment}
            </li>
          ))}
        </ul>
      </div>
      {showDeleteButton()}
    </div>
  )
}

export default Blog
