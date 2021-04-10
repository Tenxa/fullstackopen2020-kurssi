const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let timer
export const createNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: message
    })
    timer = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
    return () => clearTimeout(timer)
  }
}

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer