import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div className='loginForm'>
      <h2 className='loginForm__title heading-2'>Log in to application:</h2>
      <form onSubmit={handleSubmit}>
        <div className='loginForm__item'>
          username:
          <input
            id='username'
            type='text'
            value={username}
            placeholder='&nbsp;&nbsp;for access type: test '
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div className='loginForm__item'>
          password:
          <input
            id='password'
            type='password'
            value={password}
            placeholder='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; type: user '
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button className='btn btn__login' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
