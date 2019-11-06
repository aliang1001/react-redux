import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import store from './store'
import { Provider } from './React-redux'

class Index extends Component {

  render () {
    return (
        <Provider store={store}>
          <Header />
          <Content />
        </Provider>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
