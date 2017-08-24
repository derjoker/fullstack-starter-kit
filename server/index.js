import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import next from 'next'

import schema from './schema'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = dev ? 3000 : 9000

app.prepare()
  .then(() => {
    const server = express()

    server.use('/graphql', bodyParser.json(), graphqlExpress({
      schema
    }))

    server.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
