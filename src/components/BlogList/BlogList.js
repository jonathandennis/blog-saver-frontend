import React from 'react'

import { Link } from 'react-router-dom'

import './styles.scss'

const BlogList = ({ blogs }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className='blogs'>
      <ul className='blogs__list'>
        {blogs.sort(byLikes).map((blog) => (
          <li key={blog.id} className='blogs__list--li stripe-li'>
            <Link className='blogs__list--link' to={`/${blog.id}`}>
              {blog.title},&nbsp;&nbsp;{blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
