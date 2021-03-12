import React from 'react'

import { Link } from 'react-router-dom'

import './styles.scss'

const NavBar = ({ loggedUser, handleLogout }) => {
  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <Link className='navbar__link navbar__link--1' to='/'>
          blogs
        </Link>
        <Link className='navbar__link navbar__link--2' to='/users'>
          users
        </Link>
      </div>
      <div className='navbar__right'>
        <em className='navbar__right--user'>{loggedUser.name} logged in </em>
        <button
          type='submit'
          onClick={handleLogout}
          className='navbar__right--btn'
        >
          logout
        </button>
      </div>
    </nav>
  )
}

export default NavBar
