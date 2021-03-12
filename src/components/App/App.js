import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Blog from '../Blog/Blog'
import BlogList from '../BlogList/BlogList'
import Notification from '../Notification/Notification'
import BlogForm from '../BlogForm/BlogForm'
import LoginForm from '../LoginForm/LoginForm'
import UserList from '../UserList/UserList'
import User from '../User/User'
import Footer from '../Footer/Footer'
import blogService from '../../services/blogs'
import loginService from '../../services/login'

import './styles.scss'

import { initializeBlogs } from '../../reducers/blogReducer'
import {
  initializeLoggedUser,
  setLoggedUser,
  setLoggedUserNull,
} from '../../reducers/loggedUserReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.loggedUser)
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      dispatch(setLoggedUser())
      setUsername('')
      setPassword('')
      dispatch(
        setNotification(
          `${loggedUser.name} has been sucessfully logged in.`,
          'ok'
        )
      )
    } catch (error) {
      dispatch(setNotification('Wrong username or password'))
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem(
      'loggedBlogappUser',
      JSON.stringify(loggedUser)
    )
    dispatch(setLoggedUserNull(null))
    history.push('/')
    dispatch(
      setNotification(
        `${loggedUser.name} has been sucessfully logged out.`,
        'ok'
      )
    )
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const matchBlogs = useRouteMatch('/:id')
  const blog = matchBlogs
    ? blogs.find((blog) => blog.id === String(matchBlogs.params.id))
    : null

  const matchUsers = useRouteMatch('/users/:id')
  const user = matchUsers
    ? users.find((user) => user.id === String(matchUsers.params.id))
    : null

  if (loggedUser === null) {
    return (
      <div>
        <main>
          <div className='header'>
            <div className='header__title'>
              <h1 className='heading-1'>&lt;blogSaver app&gt;</h1>
            </div>
            <div className='header__text'>
              <h4 className='heading-3'>
                &#47;&#47; This is a repository for continued learning. To enter
                new content, please sign in.
              </h4>
            </div>
          </div>
          <Notification />
          {loginForm()}
          <footer>
            <Footer />
          </footer>
        </main>
      </div>
    )
  }

  return (
    <div>
      <header className='header'>
        <NavBar
          className='header__nav'
          loggedUser={loggedUser}
          handleLogout={handleLogout}
        />
        <div className='header__title'>
          <h1 className='heading-1'>&lt;blogSaver app&gt;</h1>
        </div>
        <div className='header__text'>
          <h4 className='heading-3'>
            &#47;&#47; This is a repository for continued learning and skills
            development.
          </h4>
          <h4 className='heading-3'>
            &#47;&#47; Add, like, delete, and comment on content for future
            reference.
          </h4>
        </div>
      </header>
      <main>
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User user={user} />
          </Route>
          <Route path='/users'>
            <UserList users={users} />
          </Route>
          <Route path='/:id'>
            <Blog blog={blog} loggedUser={loggedUser} />
          </Route>
          <Route path='/'>
            <BlogForm loggedUser={loggedUser} />
            <BlogList blogs={blogs} />
          </Route>
        </Switch>
        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  )
}

export default App
