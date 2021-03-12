import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from '../src/components/App/App'

import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import '../src/fonts/Lato-Regular.ttf'
import '../src/fonts/Lato-Italic.ttf'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
