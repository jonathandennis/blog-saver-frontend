import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action now: ', action)
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG': {
    return state.filter(blog => blog.id !== action.data)
  }
  case 'LIKE_BLOG': {
    const id = action.data.data.id
    return state.map(blog => blog.id !== id ? blog : action.data.data)
  }
  case 'NEW_COMMENT': {
    const id = action.id
    const comment = action.data
    return state.map(blog => blog.id !== id ? blog : {
      ...blog,
      comments: [...blog.comments, comment]
    })
  }

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    } catch(exception){
      dispatch(setNotification('Error getting blogs!'))
    }
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(title, author, url)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
    } catch(exception){
      dispatch(setNotification('Error adding blog, missing content!'))
    }
  }
}

export const likeBlog = (blog) => {
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    try {
      const newObject = await blogService.update(blog.id, changedBlog)
      dispatch({
        type: 'LIKE_BLOG',
        data: newObject
      })
    } catch(exception){
      dispatch(setNotification('Error liking blog!'))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const newComment = await blogService.addComment(id, comment)
      dispatch({
        type: 'NEW_COMMENT',
        data: newComment, id
      })
    } catch(exception){
      dispatch(setNotification('Error, Requires content!'))
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      console.log('blog to delete: ', id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id,
      })
    } catch(exception){
      dispatch(setNotification('Error deleting blog!'))
    }
  }
}

export default blogReducer