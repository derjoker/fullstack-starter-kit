import express from 'express'

const server = express()

const isProd = process.env.NODE_ENV === 'production'
const PORT = isProd ? 9000 : 4000

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.use(express.static('build'))

server.get('/', (req, res) => {
  res.sendFile('index.html')
})

server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${PORT}`)
})
