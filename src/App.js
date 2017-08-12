import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import 'antd/dist/antd.css'

import MainLayout from './containers/MainLayout'

const Home = () => (
  <div>Home</div>
)

const About = () => (
  <div>About</div>
)

const history = createBrowserHistory()

class App extends Component {
  render () {
    const content = (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </div>
    )
    return (
      <Router history={history}>
        <div>
          <MainLayout content={content} />
        </div>
      </Router>
    )
  }
}

export default App
