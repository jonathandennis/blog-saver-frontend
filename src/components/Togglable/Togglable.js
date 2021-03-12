import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='btn btn__add' onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='btn btn__cancel' onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
