const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return state = null

  default:
    return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

let timeoutID

export const setNotification = (message, type='error') => {
  console.log('timeoutID: ', timeoutID)

  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      data: { message, type },
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationReducer