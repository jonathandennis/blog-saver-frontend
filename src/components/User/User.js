import React from 'react'

import './styles.scss'

export const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className='user'>
      <h2 className='user__name heading-2'>{user.name}</h2>
      <h5 className='user__name--added heading-3'>added blogs:</h5>
      <ul className='user__bloglist'>
        {user.blogs.map((user) => (
          <li key={user.id} className='user__bloglist--item user-stripe-li'>
            {user.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
