import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { ApolloClient, ApolloProvider } from 'react-apollo'

import './index.css'
import App from './App'

const client = new ApolloClient()

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
