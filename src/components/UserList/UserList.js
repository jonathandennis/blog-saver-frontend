import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

const UserList = ({ users }) => {
  console.log('users in UserList: ', users)

  return (
    <div className='users'>
      <h2 className='users__header heading-2'>Users:</h2>
      <table className='users__table'>
        <thead>
          <tr>
            <th className='th'></th>
            <th className='th users__table--title heading-3'>blogs created:</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='tr users__list'>
              <td className='td users__list--items'>
                <Link to={`/users/${user.id}`} className='users__list--link'>
                  {user.name}
                </Link>
              </td>
              <td className='td users__table--totals'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
