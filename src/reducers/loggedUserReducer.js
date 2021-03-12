import blogService from '../services/blogs'

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_LOGGEDUSER':
    return action.data
  case 'SET_LOGGEDUSER':
    return action.data
  case 'SET_LOGGEDUSERNULL':
    return action.data

  default:
    return state
  }
}

export const initializeLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return async dispatch => {
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'INIT_LOGGEDUSER',
        data: loggedUser,
      })
    }
  }
}

export const setLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return async dispatch => {
    const loggedUser = JSON.parse(loggedUserJSON)
    blogService.setToken(loggedUser.token)
    dispatch({
      type: 'SET_LOGGEDUSER',
      data: loggedUser,
    })
  }
}

export const setLoggedUserNull = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_LOGGEDUSERNULL',
      data: null
    })
  }
}

export default loggedUserReducer