import React from 'react'
import { useSelector } from 'react-redux'

import './Notification.scss'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  if (notification === null) {
    return null
  }

  return (
    <div
      className='notification'
      style={{ color: notification.type === 'ok' ? 'green' : 'red' }}
    >
      {notification.message}
    </div>
  )
}

export default Notification
